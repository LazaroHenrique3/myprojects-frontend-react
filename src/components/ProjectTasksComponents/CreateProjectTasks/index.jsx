import * as c from './style'

import {BsPlusLg} from "react-icons/bs";

//React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//yup
import * as Yup from 'yup';

import Button from '../../layout/Forms/Button';

const schema = Yup.object({
    title: Yup.string().required("Campo obrigatório!"),
})


const CreateProjectTasks = ({addTask}) => {

    const {
        register,
        reset,
        handleSubmit: onSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleAddTaskOnProject = ({title}) => {
        addTask(title)
        reset()
    }

    return (
        <c.Form onSubmit={onSubmit(handleAddTaskOnProject)}>
            <c.AddTaskInput>
                <c.TitleInput id="title" type="text" {...register("title")} />
                {(errors?.title?.message) ? <c.ErrorValidateMessage>{errors?.title?.message}</c.ErrorValidateMessage> : ""}
            </c.AddTaskInput>
            <Button btnColor="#11a828" icon={<BsPlusLg/>}/>    
        </c.Form>
    )
}

export default CreateProjectTasks