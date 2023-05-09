import { useState, useEffect } from "react";

import { ThemeProvider } from "styled-components";
import GlobalStyle from './styles/global'

//Importação dos temas
import { themeLight, themeDark } from "./styles/theme";

//Importando as rotas
import AppRoutes from "./AppRoutes";

//Importando o Toasts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Importando o context 
import { ThemeContext } from "./context/Theme";

function App() {

  const [theme, setTheme] = useState(themeLight)
  const [isLight, setIsLight] = useState(true)

  //Verificando se tem algum tema salvo
  useEffect(() => {
    const saveTheme = localStorage.getItem('theme')
    if (saveTheme === 'dark') {
      setTheme(themeDark)
      setIsLight(false)
    }
  }, [])

  const switchTheme = () => {
    if (isLight) {
      setTheme(themeDark)
      setIsLight(false)
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme(themeLight)
      setIsLight(true)
      localStorage.setItem('theme', 'light')
    }
  }

  return (

    <ThemeContext.Provider value={{ switchTheme, isLight }}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
        <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_LEFT} />
        <GlobalStyle />
      </ThemeProvider>
    </ThemeContext.Provider>

  );
}

export default App;
