import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body{
        font-family: "Poppins", sans-serif;
        background-color: ${(props) => props.theme.bg_color_one};
    }
`