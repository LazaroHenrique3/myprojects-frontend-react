//Styles
import * as c from './style'

//Icons
import { BsSearch, BsArrowCounterclockwise } from "react-icons/bs";

//Importando o Context de Project
import { ProjectContext } from "../../../context/Project"

//React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//yup
import * as Yup from 'yup';
import { useContext } from 'react';

const schema = Yup.object({
    titleSearch: Yup.string().required("Campo obrigatório!"),
})

const SearchProject = ({setSearchNotFound, setOffset, total }) => {

    //Pegando informações do Context
    const { ProjectsCRUD } = useContext(ProjectContext)

    const {
        register,
        handleSubmit: onSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleSubmit = async ({ titleSearch }) => {
        const resultProjects = await ProjectsCRUD.getProjectsFromUser(titleSearch)
        setSearchNotFound(resultProjects.length <= 0 ? true : false);

        //Para resetar a paginação
        setOffset(0)
    }

    return (
        <c.SearchProjectContainer>
            {total} Projeto(s) encontrado(s).
            <c.Form onSubmit={onSubmit(handleSubmit)}>
                <c.InputContainer>
                    <c.SearchInput placeholder='Projeto a ser pesquisado...' id="titleSearch" type="text" {...register("titleSearch")} />
                    <c.ErrorValidateMessage>{errors?.titleSearch?.message}</c.ErrorValidateMessage>
                </c.InputContainer>

                <c.submitContainer>
                    <c.submitButton type="submit">
                        <BsSearch />
                    </c.submitButton>

                    <c.refreshTableButton onClick={handleSubmit} type='button'>
                        <BsArrowCounterclockwise />
                    </c.refreshTableButton>
                </c.submitContainer>
            </c.Form>
        </c.SearchProjectContainer>
    )
}

export default SearchProject