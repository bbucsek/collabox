import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    flex: 8.5;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.whiteFontColor};
`

export const Title = styled.div`
    color: ${({ theme }) => theme.colors.lightGreen};
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 3rem;
`

export const Button = styled.button`
    border-radius: 5px;
    border-width: 0px;
    color: ${({ theme }) => theme.colors.backgroundLight};
    background-color:  ${({ theme }) => theme.colors.orange};
    font-size: 1.2rem;
    margin: 10px 0;
    min-height: 20px;
    outline: none;
    transition: 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    } 
    cursor: pointer;
`