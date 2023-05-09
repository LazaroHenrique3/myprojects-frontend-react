import { useContext, useState } from 'react';

import { ThemeContext } from '../../../context/Theme';
import { AuthContext } from '../../../context/auth';

import { Link } from "react-router-dom";

//style
import * as c from './style'

//Icons
import {
  BsFillCalendarCheckFill,
  BsMoonStarsFill,
  BsSunFill,
  BsBoxArrowRight,
  BsPersonCircle,
  BsXLg,
  BsList
} from "react-icons/bs";
import ModalUser from '../../ModalUser';


const Navbar = () => {
  //Pegando informações do Context que gerencia coisas relacioandos ao login do usuario
  const { authenticated, logout, user } = useContext(AuthContext)

  //Pegando informações do Context de tema
  const { switchTheme, isLight } = useContext(ThemeContext)

  //Realizando o logout
  const handleLogout = () => {
    const confirm = window.confirm('Tem certeza que deseja sair?')
    if (confirm) {
      logout()
    }
  }

  //Relacionado ao Navbar
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const profileHandleClick = () => {
    handleClick()
    handleOpenCloseModal()
    console.log('Jogue na minah')
  }

  //Relacionados ao modal
  const [modalIsOpen, setIsOpen] = useState(false);
  const handleOpenCloseModal = () => setIsOpen(!modalIsOpen)

  const currentUrl = window.location.pathname

  return (
    <>
      <c.NavbarContainer >
        <div className={click ? "main-container" : ""} onClick={() => Close()} />
        <nav className="navbar" onClick={e => e.stopPropagation()}>
          <div className="nav-container">
            <Link to="/home" className="nav-logo">
              MyProjects
              <BsFillCalendarCheckFill className='header-icon' />
            </Link>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              {(authenticated && currentUrl !== '/') ?
                <>

                  {(user.id !== 23) &&
                    <li className="nav-item">
                      <Link className="nav-links" onClick={click ? profileHandleClick : handleOpenCloseModal}>
                        <BsPersonCircle /> {user.name}
                      </Link>
                    </li>}

                  <li className="nav-item">
                    <Link className="nav-links" onClick={handleLogout}>
                      <BsBoxArrowRight /> Sair
                    </Link>
                  </li>
                </>
                : ""}
              <li className="nav-item">
                <Link className="nav-links">
                  {(!isLight) ? <BsSunFill onClick={switchTheme} /> : <BsMoonStarsFill onClick={switchTheme} />}
                </Link>
              </li>
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              {click ? <BsXLg /> : <BsList />}
            </div>
          </div>
        </nav>
      </c.NavbarContainer>
      <ModalUser modalIsOpen={modalIsOpen} handleOpenCloseModal={handleOpenCloseModal} />
    </>
  );
}

export default Navbar