import { useState, useContext } from "react"

import * as c from "./style"

//Importando o Context de Project
import { ProjectContext } from "../../../context/Project"

import Project from "../Project"
import Loading from "../../layout/Loading"
import SearchProject from "../SearchProject";
import Pagination from "../Pagination";

const GridProjects = () => {

  //Pegando informações do Context
  const { projects, loading } = useContext(ProjectContext)

  //Armazena se foi encontrado o projeto da pesquisa para controlar a mensagem
  const [searchNotFound, setSearchNotFound] = useState(false)

  /*
    PAGINAÇÃO
    liimit determina quantos resultados devem aparecer na página
    offset é o espaço que deve ser pulado entre os resultados da pesquisa
    a paginação foi feita totalmente no frontend, para entender o uso do 
    limit e offset veja o component de Pagiantion
   */
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);

  //Faço um recorde da parte do array de projetos que desejo exibir
  const projectsPaginated = projects.slice(offset, offset + limit)

  return (
    (loading) ?
      <Loading />
      : (projects.length <= 0 && searchNotFound === false) ?
        <c.Message>Não há projetos salvos!</c.Message>
        :
        <c.ProjectsContainer>
          <SearchProject total={projects.length} setSearchNotFound={setSearchNotFound} setOffset={setOffset} />
          {(searchNotFound) ?
            <c.Message>Não foram encontrados resultados para essa pesquisa!</c.Message>
            :
            <>
              <c.TableProjectsContainer align="center">
                <c.TableHead>
                  <c.Tr className="not-hover">
                    <c.Th>Título</c.Th>
                    <c.Th>Status</c.Th>
                    <c.Th date={true}>Criação</c.Th>
                    <c.Th>Ações</c.Th>
                  </c.Tr>
                </c.TableHead>
                <c.TableBody>
                  {projectsPaginated.map((project) => (
                    <Project key={project.id} project={project} />
                  ))}
                </c.TableBody>
              </c.TableProjectsContainer>
              <Pagination limit={limit} total={projects.length} offset={offset} setOffset={setOffset}/>
            </>

          }
        </c.ProjectsContainer>
  )
}

export default GridProjects