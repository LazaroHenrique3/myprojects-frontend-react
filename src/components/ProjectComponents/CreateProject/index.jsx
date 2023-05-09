import { useContext } from 'react';

//Styles
import * as c from './style'

//Importando o Toasts
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//Context de projeto
import { ProjectContext } from '../../../context/Project';

//yup
import * as Yup from 'yup';

const schema = Yup.object({
  title: Yup.string().required("Campo obrigatório!"),
})

const CreateProject = () => {

  //Pegeando informações do Context
  const { projects, ProjectsCRUD  } = useContext(ProjectContext)

  const {
    register,
    reset,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmit = async ({title}) => {
    //Validando duplicação de projetos
    const existsProject = projects.find((project) => project.title === title)
    if(existsProject){
      toast.error("Este projeto já existe!")
      return false
    }
    await ProjectsCRUD.createProjectUser(title)
    //Limpando o input
    reset()
  }

  return (
    <c.CreateProjectContainer>
      <c.Title>Novo Projeto</c.Title>
      <c.Form onSubmit={onSubmit(handleSubmit)}>
        <c.InputContainer>
          <c.ProjectInputLabel htmlFor="title">Título:</c.ProjectInputLabel>
          <c.ProjectInput id="title" type="text" {...register("title")} />
          <c.ErrorValidateMessage>{errors?.title?.message}</c.ErrorValidateMessage>
        </c.InputContainer>

        <c.submitContainer>
          <c.submitButton type="submit">
            Criar
          </c.submitButton>
        </c.submitContainer>
      </c.Form>
    </c.CreateProjectContainer>
  )
}

export default CreateProject