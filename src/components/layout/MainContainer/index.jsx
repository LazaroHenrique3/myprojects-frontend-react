import Footer from '../Footer'
import Navbar from '../Header'

import * as c from './style'

const MainContainer = ({children}) => {
  return (
    <c.MainContainer>
        <Navbar/>
        <c.Content>
          {children}
        </c.Content>
        <Footer/>
    </c.MainContainer>
  )
}

export default MainContainer