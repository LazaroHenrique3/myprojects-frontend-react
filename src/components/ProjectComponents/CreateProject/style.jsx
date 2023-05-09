import styled from "styled-components";

export const CreateProjectContainer = styled.div`
    margin-top: 30px;
    padding: 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.bg_color_two};
`
export const Title = styled.h1`
    color: ${(props) => props.theme.font_color_one};
    text-align: center;
`
export const Form = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`
export const InputContainer = styled.div`
    width: 100%;
`

export const ProjectInputLabel = styled.label`
    color: ${(props) => props.theme.font_color_one};
    margin: 4px;
`
export const ErrorValidateMessage = styled.small`
   color: #d10000;
   display: block;
   font-size: 13px;
   height: 22px;
`
export const ProjectInput = styled.input`
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 6px;
    width: 100%;
    color: ${(props) => props.theme.font_color_two};
`

export const submitContainer = styled.div`
  padding: 22px 0px;
`

export const submitButton = styled.button`
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 600;
    padding: 10px;
    border-radius: 6px;
    color: ${(props) => props.theme.font_color_white};
    background-color: ${(props) => props.theme.btn_color_one};
    transition: 0.5s;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover{
        background-color: ${(props) => props.theme.btn_color_one_hover};
    }
`