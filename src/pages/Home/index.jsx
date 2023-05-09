//Context do project
import { ProjectProvider } from "../../context/Project"

import CreateProject from "../../components/ProjectComponents/CreateProject"
import GridProjects from "../../components/ProjectComponents/GridProjects"
import MainContainer from "../../components/layout/MainContainer"

const Home = () => {

  return (
    <ProjectProvider>
      <MainContainer>
        <CreateProject/>
        <GridProjects/>
      </MainContainer>
    </ProjectProvider>
  )
}

export default Home