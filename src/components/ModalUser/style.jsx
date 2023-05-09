import styled from "styled-components";

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    color: ${(props) => props.theme.font_color_one};
    border-bottom: 2px solid ${(props) => props.theme.btn_color_one};
  `

export const ModalCloseButton = styled.button`
      font-size: 15px;
      font-weight: 600;
      padding: 10px;
      border-radius: 6px;
      color: ${(props) => props.theme.font_color_white};
      background-color: ${(props) => props.theme.btn_color_one};
      outline: none;
      border: none;
      cursor: pointer;
      transition: 0.5s;
  
      &:hover{
          background-color: ${(props) => props.theme.btn_color_one_hover};
      }
  `

export const ModalTitle = styled.h2`
    font-size: 20px;
    margin-right: 20px;
  `

export const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
  `
export const  ModalForm = styled.form`

`

export const ContainerLoginInputs = styled.div`
 margin: 15px 0px;
`

export const containerCheckBox = styled.div`
  display: flex;
`
export const containerButtons = styled.div`
  margin: 10px 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ModalInputLabel = styled.label`
    color: ${(props) => props.theme.font_color_one};
    margin: 4px;
`

export const ErrorValidateMessage = styled.small`
   color: #d10000;
   display: block;
   font-size: 13px;
`

export const ModalInput = styled.input`
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 6px;
    color: ${(props) => props.theme.font_color_two};
    width: ${(props) => (props.isCheckBox) ? '' : '100%'};
`



