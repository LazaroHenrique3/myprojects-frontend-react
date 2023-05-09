import styled from "styled-components";

export const CheckBoxTask = styled.input`
    margin-bottom: 10px;
    margin-top: 15px;
`

export const CheckBoxTaskLabel = styled.label`
    margin-left: 5px;
    text-decoration: ${(props) => (props.lineTask)};
`

export const CheckBoxTaskContainer = styled.div`

`
export const Form = styled.form`
    display: inline-block;
`
export const TitleInput = styled.input`
    border: none;
    outline: none;
    padding: 3px;
    border-radius: 6px;
    width: 200px;
    margin-left: 10px;
    color: ${(props) => props.theme.font_color_two};
`