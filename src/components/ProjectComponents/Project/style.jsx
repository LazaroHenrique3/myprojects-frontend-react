import styled from "styled-components";

export const ProjectContainer = styled.tr`
     padding: 10px;
    margin-bottom: 10px;

    td:first-child {
        border-bottom: solid 1px ${(props) =>(props.rowTask) ? props.theme.btn_color_one : "transparent"};  
    }
`

export const ProjectInfo = styled.td`
    width: ${(props) => props.width};
    text-align: center;

    form.add-task{
        display: flex
    }

   @media (max-width: 710px) {
    display: ${(props) => (props.date) ? 'none' : ''};
   }
`

export const Form = styled.form`

`
export const StatusSelect = styled.select`
    border: none;
    font-weight: bold;
    border-radius: 6px;
    padding: 6px 10px;
    outline: none;
    background-color: transparent;
    border: 2px solid ${(props) => props.color};
    color:  ${(props) => props.color};
    cursor: pointer;
    transition: 0.4s;

    &:hover{
        color: white;
        background-color: ${(props) => props.color};
    }

    @media (max-width: 822px) {
        font-size: 80%;
    }
`

export const StatusOption = styled.option`

`

export const ProjectActions = styled.td`
    text-align: center;

    @media (max-width: 425px) {
        font-size: 90%;
    }

    @media (max-width: 375px) {
        display: flex;
    }
`

export const Content = styled.span`
    border-radius: 10px;
`

export const ErrorValidateMessage = styled.small`
   color: #d10000;
   display: block;
   font-size: 13px;
   height: 22px;
`
export const TitleInput = styled.input`
    border: none;
    outline: none;
    padding: 5px;
    border-radius: 6px;
    width: 100%;
    margin: 0px;
    color: ${(props) => props.theme.font_color_two};
`

