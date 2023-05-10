import { useState, useContext, useEffect } from "react"

import MainContainer from "../../components/layout/MainContainer";

//React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//Context de autenticação
import { AuthContext } from "../../context/auth"

//Estilos do styled components
import * as c from "./style"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createUser } from "../../services/api";

//yup
import * as Yup from 'yup';


const schemaLogin = Yup.object({
  email: Yup.string().email("Email inválido!").required("Campo obrigatório!"),
  password: Yup.string().required("Campo obrigatório!").min(5, "Minímo de 5 caracteres!"),
})

const schemaRegister = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("Email inválido!").required("Campo obrigatório!"),
  password: Yup.string().required("Campo obrigatório!").min(5, "Minímo de 5 caracteres!"),
  passwordConfirm: Yup.string().required("Campo obrigatório!")
    .min(5, "Minímo de 5 caracteres!")
    .oneOf([Yup.ref('password')], 'Senhas diferentes!')
})

const Login = () => {

  //Para mostraro input de confirmar senha, pois se não for login será Register
  const [isLogin, setIsLogin] = useState(true)
  //Vai armazena o schema que será utilizado
  const [schema, setSchema] = useState(schemaLogin)
  //Vai atualizar o schema que esta sendo utilizado com base na alteração do state de isLogin
  useEffect(() => {
    if (isLogin) {
      setSchema(schemaLogin)
      unregister("passwordConfirm");
      unregister("name");
      reset()
    } else {
      setSchema(schemaRegister)
    }
  }, [isLogin])

  //Pegando informações do Context
  const { login } = useContext(AuthContext)

  const {
    reset,
    register,
    unregister,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });


  const registerUser = async ({ name, email, password, passwordConfirm }) => {
    try {
      const response = await createUser(name, email, password, passwordConfirm)
      setIsLogin(!isLogin)
      toast.success("Cadastro concluído com sucesso!")
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  const handleSubmit = (data) => {
    if (isLogin) {
      login(data)
    } else {
      registerUser(data)
    }
  }

  return (
    <MainContainer>
      <c.ContainerLogin>
        <c.LoginCard>
          <c.LoginTitle>
            {(isLogin) ? "Login" : "Cadastre-se"}
          </c.LoginTitle>

          <c.Form onSubmit={onSubmit(handleSubmit)}>
            <c.ContainerLoginInputs>


              {(!isLogin) ?
                <>
                  <c.LoginInputLabel htmlFor="name">Nome</c.LoginInputLabel>
                  <c.LoginInput id="name" type="text" {...register("name")} />
                  <c.ErrorValidateMessage>{errors?.name?.message}</c.ErrorValidateMessage>
                </>
                : <></>}

              <c.LoginInputLabel htmlFor="email">Email</c.LoginInputLabel>
              <c.LoginInput placeholder={(isLogin) ? 'teste@gmail.com' : ''} id="email" type="text" {...register("email")} />
              <c.ErrorValidateMessage>{errors?.email?.message}</c.ErrorValidateMessage>

              <c.LoginInputLabel htmlFor="password">Senha</c.LoginInputLabel>
              <c.LoginInput placeholder={(isLogin) ? 'teste' : ''} id="password" type="password" {...register("password")} />
              <c.ErrorValidateMessage>{errors?.password?.message}</c.ErrorValidateMessage>

              {(!isLogin) ?
                <>
                  <c.LoginInputLabel htmlFor="passwordConfirm">Confirmar Senha</c.LoginInputLabel>
                  <c.LoginInput id="passwordConfirm" type="password" {...register("passwordConfirm")} />
                  <c.ErrorValidateMessage>{errors?.passwordConfirm?.message}</c.ErrorValidateMessage>
                </>
                : <></>}

            </c.ContainerLoginInputs>

            <c.submitButton type="submit">
              {(isLogin) ? "Logar" : "Cadastrar"}
            </c.submitButton>
          </c.Form>

          <c.linkLoginRegister onClick={() => { setIsLogin(!isLogin) }}>
            {(isLogin) ? "Inscreva-se" : "Logar"}
          </c.linkLoginRegister>

        </c.LoginCard>
      </c.ContainerLogin>
    </MainContainer>
  )
}

export default Login





