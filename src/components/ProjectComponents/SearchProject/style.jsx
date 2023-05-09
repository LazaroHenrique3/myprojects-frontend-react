import styled, {css} from "styled-components";

const BaseButton = (color, bg_color, bg_color_hover) => css`
    font-size: 15px;
    font-weight: 600;
    padding: 10px;
    border-radius: 6px;
    color: ${color};
    background-color: ${bg_color};
    outline: none;
    border: none;
    cursor: pointer;
    transition: 0.5s;

    &:hover{
        background-color: ${bg_color_hover};
    }
`

export const SearchProjectContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 670px) {
        flex-direction: column-reverse;
    }
`
export const Form = styled.form`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`
export const InputContainer = styled.div`

`
export const ErrorValidateMessage = styled.small`
   color: #d10000;
   display: block;
   font-size: 13px;
   height: 22px;
`
export const SearchInput = styled.input`
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 6px;
    margin-top: 22px;
    width: 100%;
    color: ${(props) => props.theme.font_color_two};
`

export const submitContainer = styled.div`
  display: flex;
  gap: 5px;
  padding: 22px 0px;
`

export const submitButton = styled.button`
    ${BaseButton((props) => props.theme.font_color_white, (props) => props.theme.btn_color_one, (props) => props.theme.btn_color_one_hover)}
`

export const refreshTableButton = styled.button`
    ${BaseButton('#FFF', '#11a828', '#0d9b22')}
`


