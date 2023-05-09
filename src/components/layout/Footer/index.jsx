import * as c from './style'

//Icons
import { BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <c.FooterContainer>
        <c.IconsContainer>
            <c.IconFooter target='_blank' href='https://github.com/LazaroHenrique3'>
                <BsGithub/>
            </c.IconFooter>

            <c.IconFooter target='_blank' href='https://www.linkedin.com/in/lazaro-henrique-b13074248/'>
                <BsLinkedin/>
            </c.IconFooter>

            <c.IconFooter target='_blank' href='https://www.instagram.com/lazaro_fernandes_art/'>
                <BsInstagram/>
            </c.IconFooter>
        </c.IconsContainer>

        <c.CopyName>
            © 2023 - Lázaro Fernandes
        </c.CopyName>
    </c.FooterContainer>
  )
}

export default Footer