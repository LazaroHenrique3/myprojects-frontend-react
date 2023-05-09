import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    justify-content: center;
`
export const AddTaskInput = styled.div`

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
    padding: 7px;
    border-radius: 6px;
    width: 100%;
    margin: 0px;
    color: ${(props) => props.theme.font_color_two};
`