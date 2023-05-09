import styled from "styled-components";

export const Form = styled.form``

export const ContainerLogin = styled.div`
    padding-top: 80px;
    display: flex;
    justify-content: center;
`

export const LoginCard = styled.div`
    width: 300px;
    min-height: 400px;
    box-shadow: 1px 17px 36px 5px rgba(0,0,0,0.15);
    border-radius: 10px;
    padding: 6px 10px;
    background-color: ${(props) => props.theme.bg_color_two};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export const LoginTitle = styled.h1`
    font-weight: 600;
    letter-spacing: 2px;
    text-align: center;
    color: ${(props) => props.theme.font_color_one};
`

export const ContainerLoginInputs = styled.div`
 margin: 15px 0px;
`
export const LoginInputLabel = styled.label`
    color: ${(props) => props.theme.font_color_one};
    margin: 4px;
`

export const ErrorValidateMessage = styled.small`
   color: #d10000;
   display: block;
   font-size: 13px;
`

export const LoginInput = styled.input`
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 6px;
    width: 100%;
    color: ${(props) => props.theme.font_color_two};
`

export const submitButton = styled.button`
    text-transform: uppercase;
    font-size: 20px;
    padding: 6px;
    width: 100%;
    border-radius: 6px;
    color: ${(props) => props.theme.font_color_white};
    background-color: ${(props) => props.theme.btn_color_one};
    transition: 0.5s;
    outline: none;
    border: none;

    &:hover{
        background-color: ${(props) => props.theme.btn_color_one_hover};
    }
`

export const linkLoginRegister = styled.a`
    cursor: pointer;
    font-size: 15px;
    color: ${(props) => props.theme.btn_color_one};
`
