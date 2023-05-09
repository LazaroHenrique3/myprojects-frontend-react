import styled from "styled-components"

export const TasksContainer = styled.tr`
    padding: 10px;
    margin-bottom: 10px;

    td:first-child {
        border-bottom: solid 1px ${(props) =>(props.rowTask) ? props.theme.btn_color_one : "transparent"};  
    }
`

export const TaskInfo = styled.td`
    width: ${(props) => props.width};
    text-align: center;
`