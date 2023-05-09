import { useState, useEffect, useCallback } from 'react'

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import * as c from "./style"

//React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../layout/Forms/Button';

//yup
import * as Yup from 'yup';
const schema = Yup.object({
    title: Yup.string().required("Campo obrigatório!"),
})

const ProjectTasksItens = ({ task, updateTask, deleteTask }) => {

    const {
        register,
        reset,
        handleSubmit: onSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    const taskLine = (task.status === 'Concluida') ? "line-through" : "none"

    //Vai armazenar true se for concluída e false se não for
    const [taskStatus, setTaskStatus] = useState(task.status)
    const [taskTitle, setTaskTitle] = useState(task.title)

    const [isUpdateTitleTask, setIsUpdateTitleTask] = useState(false)

    //Alteração do status da Task
    const handleUpdateTask = useCallback(() => {
        if (task.status !== taskStatus) {
            updateTask(task.id, taskTitle, taskStatus)
        }
    }, [task.status, task.id, taskTitle, taskStatus, updateTask])

    useEffect(() => {
        handleUpdateTask()
    }, [handleUpdateTask])

    const handleUpdateStatus = () => {
        const newStatus = (task.status === "Concluida") ? "Pendente" : "Concluida"
        setTaskStatus(newStatus)
    }

    //Exclusão da Tarefa
    const handleDeleteTask = () => {
        const confirmDelete = window.confirm(`Deseja excluir a tarefa "${taskTitle}" ?`)
        if (confirmDelete) {
            deleteTask(task.id)
        }
    }

    //Mostra o input de alteração
    const handleUpdateTitle = () => {
        setIsUpdateTitleTask(!isUpdateTitleTask)
        reset()
    }

    //Alteração da tarefa
    const handleSubmitUpdateTitle = ({ title }) => {
        setTaskTitle(title)
        updateTask(task.id, title, taskStatus)
        handleUpdateTitle()
    }

    return (
        <c.CheckBoxTaskContainer>
            <c.CheckBoxTask onChange={() => handleUpdateStatus()} defaultChecked={task.status === "Concluida"} type="checkbox" name={task.title} nvalue={taskStatus} />
            {(isUpdateTitleTask) ?
                <c.Form onSubmit={onSubmit(handleSubmitUpdateTitle)}>
                    <c.TitleInput defaultValue={task.title} id="title" type="text" {...register("title")} />
                </c.Form>
                : <c.CheckBoxTaskLabel lineTask={taskLine}>{task.title}</c.CheckBoxTaskLabel>}
            <Button handleFunction={handleUpdateTitle} btnColor="#f09e40" icon={<BsFillPencilFill />} />
            <Button handleFunction={handleDeleteTask} btnColor="#f04640" icon={<BsFillTrashFill />} />
        </c.CheckBoxTaskContainer>
    )
}

export default ProjectTasksItens