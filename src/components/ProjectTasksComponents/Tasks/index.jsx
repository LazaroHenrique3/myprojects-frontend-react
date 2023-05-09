import * as c from './style'

//Importando a função de criação
import { createTask, updateTask, deleteTask } from "../../../services/api";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProjectTasksItens from "../ProjectTasksItens";
import CreateProjectTasks from "../CreateProjectTasks";

const Task = ({ projectId, setTasksProject, tasks }) => {

    const addTaskProject = async (title) => {
        try {
            const response = await createTask(title, projectId)

            //A tarefa que acabou de ser inserido no banco
            const newTask = response.data.task
            //Atualizando o state de tasks
            setTasksProject([...tasks, newTask[0]])
            //Mensagem de sucesso
            toast.success("Tarefa adicionada com sucesso!")
        } catch (error) {
            toast.error("Erro ao adicionar tarefa!")
        }
    }

    const deleteTaskProject = async (idTask) => {
        try {
            await deleteTask(idTask)
            //Updating state
            const updatedTasks = tasks.filter((task) => task.id !== idTask)
            setTasksProject(updatedTasks)
            toast.success("Tarefa excluída com sucesso!")
        } catch (error) {
            toast.error("Erro ao excluir tarefa!")
        }
    }

    const updateTaskProject = async (taskId, titleUpdate, statusUpdate) => {
        try {
            await updateTask(taskId, titleUpdate, statusUpdate)

            //Getting project to be updated
            const taskForUpdate = tasks.find((task) => task.id === taskId)

            //checking if found
            if (taskForUpdate) {
                taskForUpdate.title = titleUpdate
                taskForUpdate.status = statusUpdate
            }

            //Updating state with new reference
            setTasksProject([...tasks])
            toast.success("Tarefa atualizada com sucesso!")
        } catch (error) {
            toast.error("Erro ao atualizar tarefa!")
        }
    }

    return (
        <c.TasksContainer rowTask={true} className="not-hover">
            <c.TaskInfo colSpan="4">
                <CreateProjectTasks addTask={addTaskProject} />
                {(tasks.length <= 0) ?
                    "Este projeto ainda não possui tarefas!"
                    : tasks.map((task) => (
                        <ProjectTasksItens deleteTask={deleteTaskProject} updateTask={updateTaskProject} key={task.id} task={task} />
                    ))}
            </c.TaskInfo>
        </c.TasksContainer>
    )
}

export default Task