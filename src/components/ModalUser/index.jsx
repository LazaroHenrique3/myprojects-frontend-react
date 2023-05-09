import { useState, useContext, useEffect, useCallback } from "react"

import * as c from './style'

//Pegando o context de autenticação onde está armazenado as informações do usuário
import { AuthContext } from "../../context/auth";

//Pegando o context de tema
import { ThemeContext } from 'styled-components';

//Importando a function de alterar User
import { updateUser } from "../../services/api";

//React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//yup
import * as Yup from 'yup';

//Icons
import { BsXLg, BsFillPencilFill, BsFillTrashFill, BsFillCheckCircleFill } from "react-icons/bs";

//Funções relacionadas a API
import { deleteUser } from "../../services/api";

//Modal
import Modal from 'react-modal';
import Button from '../layout/Forms/Button';
Modal.setAppElement('#root');

//Schemas para validar os inputs
const schemaUpdateUser = Yup.object({
    name: Yup.string().required("Campo obrigatório!"),
    email: Yup.string().email("Email inválido!").required("Campo obrigatório!")
})

const schemaUpdateUserPass = Yup.object({
    name: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido!").required("Campo obrigatório!"),
    password: Yup.string().required("Campo obrigatório!").min(5, "Minímo de 5 caracteres!"),
    passwordConfirm: Yup.string().required("Campo obrigatório!")
        .min(5, "Minímo de 5 caracteres!")
        .oneOf([Yup.ref('password')], 'Senhas diferentes!')
})

const ModalUser = ({ modalIsOpen, handleOpenCloseModal }) => {

    //Regula o que vai ser mostrado dentro do modal
    const [isUpdate, setIsUpdate] = useState(false)
    const [isUpdatePassword, setIsUpdatePassword] = useState(false)

    //Vai armazenar qual schema deve ser usado
    const [schema, setSchema] = useState(schemaUpdateUser)
    
    const {
        reset,
        register,
        unregister,
        handleSubmit: onSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleResetSchema = useCallback(() => {
        unregister("password");
        unregister("passwordConfirm");
        reset()
    }, [unregister, reset]);

    //Vai atualizar o schema que esta sendo utilizado com base na alteração do state de 
    useEffect(() => {
        if (isUpdatePassword) {
            setSchema(schemaUpdateUserPass)
        } else {
            setSchema(schemaUpdateUser)
            handleResetSchema()
        }
    }, [isUpdatePassword, handleResetSchema])

    //Pegando informações do Context
    const { user, logout, saveLoggedUser } = useContext(AuthContext)

    //Pegando as informações do tema de cor
    const themeContext = useContext(ThemeContext);

    const customStyles = {
        overlay: {
            backgroundColor: '#0000007f'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'transparent',
            background: themeContext.bg_color_two
        }
    };

    const handleUpdateButton = () => {
        if (isUpdate) {
            setIsUpdate(!isUpdate)
            setIsUpdatePassword(false)
            reset()
        } else {
            setIsUpdate(!isUpdate)
        }
    }


    const handleDeleteUser = async () => {
        const confirm = window.confirm("Atenção! Todas a informações serão deletadas permanentemente, você confirma?")
        if (confirm) {
            try {
                await deleteUser(user.id)
                logout()
                toast.success("Usuário deletado com sucesso!")
            } catch (error) {
                toast.error("Houve um erro, tente novamente mais tarde!")
            }
        }
    }

    const handleSubmit = async (data) => {
        const { name, email, password = '', passwordConfirm = '' } = data
        try {
            const response = await updateUser(user.id, name, email, password, passwordConfirm)
            toast.success("Usuário atualizado com sucesso!!")
            saveLoggedUser(response.data.user)
            setIsUpdate(false)
            setIsUpdatePassword(false)
            reset()
        } catch (error) {
            console.log(error)
            toast.error("Houve um erro, tente novamente mais tarde!")
        }
    }

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={handleOpenCloseModal} style={customStyles}>

            <c.ModalHeader>
                <c.ModalTitle>
                    Ajustes do usuário
                </c.ModalTitle>

                <c.ModalCloseButton onClick={handleOpenCloseModal}>
                    <BsXLg />
                </c.ModalCloseButton>
            </c.ModalHeader>

            <c.ModalBody>
                <c.ModalForm onSubmit={onSubmit(handleSubmit)}>
                    {(isUpdate) &&
                        <c.ContainerLoginInputs>
                            <c.ModalInputLabel htmlFor="name">Nome</c.ModalInputLabel>
                            <c.ModalInput defaultValue={user.name} id="name" type="text" {...register("name")} />
                            <c.ErrorValidateMessage>{errors?.name?.message}</c.ErrorValidateMessage>

                            <c.ModalInputLabel htmlFor="email">Email</c.ModalInputLabel>
                            <c.ModalInput defaultValue={user.email} id="email" type="text" {...register("email")} />
                            <c.ErrorValidateMessage>{errors?.email?.message}</c.ErrorValidateMessage>

                            <c.containerCheckBox>
                                <c.ModalInput checked={isUpdatePassword} isCheckBox={true} id="isUpdatePassword" type="checkbox" onChange={() => setIsUpdatePassword(!isUpdatePassword)} />
                                <c.ModalInputLabel htmlFor="isUpdatePassword">Deseja atualizar a senha?</c.ModalInputLabel>
                            </c.containerCheckBox>

                            {isUpdatePassword &&
                                <>
                                    <c.ModalInputLabel htmlFor="password">Nova senha</c.ModalInputLabel>
                                    <c.ModalInput defaultValue='' id="password" type="password" {...register("password")} />
                                    <c.ErrorValidateMessage>{errors?.password?.message}</c.ErrorValidateMessage>

                                    <c.ModalInputLabel htmlFor="password">Confirme nova senha</c.ModalInputLabel>
                                    <c.ModalInput defaultValue='' id="passwordConfirm" type="password" {...register("passwordConfirm")} />
                                    <c.ErrorValidateMessage>{errors?.passwordConfirm?.message}</c.ErrorValidateMessage>
                                </>}
                        </c.ContainerLoginInputs>}

                    <c.containerButtons>
                        {isUpdate && <Button type='submit' text='Salvar Alteração' btnColor="#11a828" icon={<BsFillCheckCircleFill />} />}
                    </c.containerButtons>
                </c.ModalForm>

                <c.containerButtons>
                    <Button type='button' handleFunction={handleUpdateButton} text={(isUpdate) ? "Cancelar alteração" : "Alterar usuário"} btnColor="#f09e40" icon={<BsFillPencilFill />} />
                    {!isUpdate && <Button type='button' handleFunction={handleDeleteUser} text='Excluir usuário' btnColor="#f04640" icon={<BsFillTrashFill />} />}
                </c.containerButtons>
            </c.ModalBody>
        </Modal>

    )
}

export default ModalUser