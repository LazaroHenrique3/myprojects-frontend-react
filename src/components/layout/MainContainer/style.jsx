import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;

`
export const Content = styled.div`
  flex: 1;
  width: 80%;
  margin: 0 auto;

  @media (max-width: 585px) {
      width: 100%;
  }
`
