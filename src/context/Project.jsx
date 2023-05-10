import { useState, useEffect, useContext, createContext } from "react";

//Importando a funções para manipular o Projeto
import { getProjects, createProject, deleteProject, updateProject } from "../services/api";

//Importando o context de autenticação
import { AuthContext } from "./auth";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {

    //User logado
    const { user } = useContext(AuthContext)

    //Esses são os states que deixarei publicos para manipulação dos projetos
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    //Para exeucutar apenas quando a página for carregada
    useEffect(() => {
        getProjectsFromUser()
    }, [])

    //Project

    /*Essa função busca todos os projetos do usuário logado, primeiro ela faz a busca
    sem especifica os títulos dos projetos, porém esse parâmetro pode ser incluído
    se necessário*/
    const getProjectsFromUser = async (titleProject = "") => {
        try {
            setLoading(true)
            const {data} = await getProjects(user.id, titleProject)
            setProjects(data)
            setLoading(false)
            return data
        } catch (error) {
            setLoading(false)
            toast.error('Erro inesperado, tente mais tarde!')
        }
    }

    const createProjectUser = async (title) => {
        try {
            const response = await createProject(title, user.id)
            //O projeto que acabou de ser inserido no banco
            const [newProject] = response.data.project
            //Como acabou de ser criado ainda não possui Tasks
            newProject.tasks = [] 
            setProjects([...projects, newProject])
            //Mensagem de sucesso
            toast.success("Projeto criado com sucesso!")
          } catch (error) {
            toast.error("Erro inesperado ao criar projeto!")
          }
    }

    const deleteProjectUser = async (idProject) => {
        try {
            await deleteProject(idProject)
            //Updating state
            const updatedProjects = projects.filter((project) => project.id !== idProject)
            setProjects(updatedProjects)
            toast.success("Projeto excluído com sucesso!")
        } catch (error) {
            toast.error("Erro ao excluir o projeto!")
        }
    }

    const updateProjectUser = async (idProject, title, status, tasksProject) => {
        try {
            await updateProject(idProject, title, status)
            //Getting project to be updated
            const projectForUpdate = projects.find((project) => project.id === idProject)

            //checking if found
            if (projectForUpdate) {
                projectForUpdate.title = title
                projectForUpdate.status = status
                projectForUpdate.tasks = tasksProject
            }

            //Updating state with new reference
            setProjects([...projects])
            toast.success("Projeto atualizado com sucesso!")
        } catch (error) {
            toast.error("Erro ao atualizar projeto!")
        }
    }

    const ProjectsCRUD = {
        getProjectsFromUser,
        createProjectUser,
        deleteProjectUser,
        updateProjectUser
    }

    return (
        <ProjectContext.Provider value={{ projects, loading, setLoading, setProjects, ProjectsCRUD }}>
            {children}
        </ProjectContext.Provider>
    )

}

