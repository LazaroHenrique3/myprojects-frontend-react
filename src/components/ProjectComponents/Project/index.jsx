import { useState, useContext, useEffect, useCallback } from "react";

//Icones
import { BsFillTrashFill, BsFillPencilFill, BsEyeFill } from "react-icons/bs";

//Context de projeto
import { ProjectContext } from "../../../context/Project";

//Estilos
import * as c from "./style"

//React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//yup
import * as Yup from 'yup';

import Button from "../../layout/Forms/Button";
import Task from "../../ProjectTasksComponents/Tasks";

const schema = Yup.object({
    title: Yup.string().required("Campo obrigatório!"),
})

const Project = ({ project }) => {

    const { ProjectsCRUD } = useContext(ProjectContext)

    const {
        register,
        reset,
        handleSubmit: onSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const { id, title, status, created_at, tasks } = project

    const [statusProject, setStatusProject] = useState(status)
    //Para mostrar ou não o input
    const [isUpdate, setIsUpdate] = useState(false)

    //Para definir se deve ou não exibir as taks dos projetos
    const [seeTasks, setSeeTasks] = useState(false)

    const [tasksProject, setTasksProject] = useState(tasks)

    //Exclusão
    const handleDeleteProject = () => {
        const confirmDelete = window.confirm(`Deseja excluir o projeto "${title}"`)
        if (confirmDelete) {
            ProjectsCRUD.deleteProjectUser(id)
        }
    }

    //Alteração do Status no banco sempre que houver alguma mudança
    const updateProject = useCallback(() => {
        if (status !== statusProject) {
            ProjectsCRUD.updateProjectUser(id, title, statusProject, tasksProject)
        }
    }, [ProjectsCRUD, status, statusProject, id, title, tasksProject])

    useEffect(() => {
        updateProject()
    }, [updateProject])

    //Alteração do nome
    const handleUpdateTitle = () => {
        setIsUpdate(!isUpdate)
        reset()
    }

    const handleSubmitUpdateTitle = ({ title }) => {
        ProjectsCRUD.updateProjectUser(id, title, statusProject)
        handleUpdateTitle()
    }

    //Determina qual será a cor aplicado do select de status
    const statusColors = {
        "Pendente": "#f04640",
        "Em andamento": "#f09e40",
        "Concluido": "#11a828"
    }

    const colorSelect = statusColors[status] || "#000000";

    //Tasks
    const totalTasks = tasksProject.length
    const completedTasks = tasksProject.filter(task => task.status === 'Concluida');
    const totalTasksCompleted = completedTasks.length;

    //Verifica se o projeto está completo
    function isProjectCompleted(totalTasks, totalTasksCompleted, statusProject) {
        return totalTasks > 0 && totalTasks === totalTasksCompleted && statusProject !== "Concluido";
    }

    //Verifica se o projeto está completo
    function isProjectInProgress(totalTasks, totalTasksCompleted, statusProject) {
        return totalTasks >= 0 && totalTasksCompleted >= 0 && totalTasksCompleted < totalTasks && statusProject !== "Em andamento";
    }

    //Atualiza automaticamente os status do projeto de acordo com o total de tarefas que ele possui
    if (isProjectCompleted(totalTasks, totalTasksCompleted, statusProject)) {
        setStatusProject("Concluido");
    } else if (isProjectInProgress(totalTasks, totalTasksCompleted, statusProject)) {
        setStatusProject("Em andamento");
    }

    return (
        <>
            <c.ProjectContainer>

                <c.ProjectInfo width="40%">
                    <c.Content>
                        {!(isUpdate) ?
                            `${title} (${totalTasksCompleted}/${totalTasks})`
                            : <c.Form onSubmit={onSubmit(handleSubmitUpdateTitle)}>
                                <c.TitleInput defaultValue={title} id="title" type="text" {...register("title")} />
                                {(errors?.title?.message) ? <c.ErrorValidateMessage>{errors?.title?.message}</c.ErrorValidateMessage> : ""}
                            </c.Form>}
                    </c.Content>
                </c.ProjectInfo>

                <c.ProjectInfo width="20%" type="status">
                    <c.Content>
                        <c.StatusSelect color={colorSelect} value={statusProject} onChange={(e) => setStatusProject(e.target.value)}>
                            <c.StatusOption value="Pendente">Pendente</c.StatusOption>
                            <c.StatusOption value="Em andamento">Em andamento</c.StatusOption>
                            <c.StatusOption value="Concluido">Concluído</c.StatusOption>
                        </c.StatusSelect>
                    </c.Content>
                </c.ProjectInfo>

                <c.ProjectInfo width="20%" date={true}>
                    <c.Content>{new Date(created_at).toLocaleDateString('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit' })}</c.Content>
                </c.ProjectInfo>

                <c.ProjectActions width="20%">
                    <Button handleFunction={() => setSeeTasks(!seeTasks)} btnColor="#40b8f0" icon={<BsEyeFill />} />
                    <Button handleFunction={handleUpdateTitle} btnColor="#f09e40" icon={<BsFillPencilFill />} />
                    <Button handleFunction={handleDeleteProject} btnColor="#f04640" icon={<BsFillTrashFill />} />
                </c.ProjectActions>

            </c.ProjectContainer>
            {(seeTasks) ?
                <Task setTasksProject={setTasksProject} projectId={id} tasks={tasksProject} />
                : ""}
        </>
    )
}

export default Project




