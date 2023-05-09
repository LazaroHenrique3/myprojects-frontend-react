import styled from "styled-components";

export const paginationContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 1005;
`

export const PaginationList = styled.ul`
    list-style: none;
    display: flex;
    gap: 5px;
`

export const PaginationItem = styled.li`

`

export const PaginationItemButton = styled.button`

    font-size: 15px;
    font-weight: 600;
    padding: 10px;
    border-radius: 6px;
    color: ${(props) => props.active ? props.theme.btn_color_one : props.theme.font_color_white}; 
    background-color: ${(props) => props.active ? 'transparent' : props.theme.btn_color_one};
    border: 2px solid ${(props) => props.active ? props.theme.btn_color_one : 'transparent'};
    outline: none;
    cursor: pointer;
    transition: 0.5s;

    &:hover{
        background-color: ${(props) => props.active ? 'transparent' : props.theme.btn_color_one_hover};
    }
`
