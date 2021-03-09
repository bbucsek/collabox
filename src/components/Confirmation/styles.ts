import styled from 'styled-components'

export const Container = styled.div`
    position: absolute;
    top: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40rem;
    margin-bottom: 0.6rem;
    padding: 0.5rem;
    background-color: ${({theme}) => theme.colors.error};
    color: ${({ theme }) => theme.colors.whiteFontColor};
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: 10px;
    font-size: 1.3rem;
`

export const ButtonWrapper  = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export const MessageWrapper  = styled.div`
    align-self: center;
    margin: 0.5rem;
`

export const Button = styled.button`
    width: 6rem;
    margin: 0.6rem;
    padding: 0.5rem;
    outline: none;
    border-radius: 10px;
    border-width: 0px;
    color: ${({ theme }) => theme.colors.backgroundLight};
    background-color:  ${({ theme }) => theme.colors.secondary};
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
        background-color:  ${({ theme }) => theme.colors.secondaryLight};
    } 
`