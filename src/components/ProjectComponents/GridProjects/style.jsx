import styled from "styled-components";

export const ProjectsContainer = styled.div`
    margin-top: 30px;
    margin-bottom: 20px;
    color: ${(props) => props.theme.font_color_one};
    border-radius: 10px;
    padding-bottom: 10px;
    background-color: ${(props) => props.theme.bg_color_two};

    @media (max-width: 822px) {
        font-size: 80%;
    }
`

export const TableProjectsContainer = styled.table`
    width: 100%;
    border-spacing: 0 10px;
    transition: 0.4s;

    tr:not(.not-hover):hover {
        background-color:  ${(props) => props.theme.bg_color_three};
    } 
`

export const TableHead = styled.thead`

`
export const Th = styled.th`
      @media (max-width: 710px) {
        display: ${(props) => (props.date) ? 'none' : ''};
      }
`

export const TableBody = styled.tbody`

`

export const Tr = styled.tr`
    padding: 10px;
    margin-bottom: 10px;
`

export const Message = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    border-radius: 10px;
    padding: 15px;
    margin-top: 25px;
    color: ${(props) => props.theme.font_color_one};
    background-color: ${(props) => props.theme.bg_color_two};
`

