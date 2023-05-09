import { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    //Como esses states estão sendos passados para o context, as atualizações daqui refletirão em toda a aplicação
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //Verificando se o usuario já esta logado para preparar o Context
    useEffect(() => {
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (user && token) {
            setUser(JSON.parse(user))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            const response = await createSession(email, password)

            //Armazenando no localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.token)

            //setando o token de autenticação
            api.defaults.headers.Authorization = `Bearer ${response.data.token}`

            setUser(response.data.user)
            navigate('/home')
        } catch (error) {
            toast.error("Email e/ou Senha inválido(s)!")
        }
    }

    const saveLoggedUser = (user) => {
        //Armazenando no localStorage
        localStorage.setItem('user', JSON.stringify(user))

        setUser(user)
    }

    const logout = async () => {
        //Remover as credenciais do localStorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')

        api.defaults.headers.Authorization = null
        setUser(null)
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, saveLoggedUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}