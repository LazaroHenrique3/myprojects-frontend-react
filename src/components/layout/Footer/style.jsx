import styled from "styled-components";

export const FooterContainer = styled.footer`
    font-size: 25px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.font_color_one};
    background-color: ${(props) => props.theme.bg_color_two};
`

export const IconsContainer = styled.div`
    display: flex;
    gap: 10px;
`

export const IconFooter = styled.a`
    color: ${(props) => props.theme.font_color_one};
    text-decoration: none;
    transition: 0.4s;

    &:hover{
        color: ${(props) => props.theme.btn_color_one};
    }
`

export const CopyName = styled.span`
    font-size: 15px !important;
`