import React, { useContext } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom"

import { AuthProvider, AuthContext } from './context/auth'

import Login from './pages/Login'
import Home from './pages/Home'
import Loading from './components/layout/Loading'

const AppRoutes = () => {
  const Private = ({children}) => {
    const {authenticated, loading} = useContext(AuthContext)

     //Se ainda estiver na etapa de loading la na autenticação
     if(loading){
      return <Loading/>
    }

    //Se não estou autenticado eu volto para o login
    if(!authenticated){
      return <Navigate to="/"/>
    }

    return children
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route exact path='/home' element={<Private><Home /></Private>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default AppRoutes