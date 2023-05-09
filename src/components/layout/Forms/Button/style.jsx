import styled from "styled-components";

export const ButtonAction = styled.button`
    font-size: 15px;
    padding: 6px;
    height: 30px;
    border-radius: 5px;
    margin-left: 4px;
    background-color: transparent;
    color: ${(props) => props.btnColor};
    border: 2px solid ${(props) => props.btnColor};
    cursor: pointer;
    transition: 0.4s;

    &:hover{
        color: white;
        background-color: ${(props) => props.btnColor};
    }

    @media (max-width: 822px) {
        font-size: 80%;
    }
`