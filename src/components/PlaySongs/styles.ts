import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.lightBlue};
    box-shadow: ${({ theme }) => theme.boxShadow};
    margin-bottom: 2rem;
`

export const YoutubeWrapper = styled.div`
    display: none;
`

export const ControlWrapper = styled.div`
    display:flex;
    align-items: center;
    svg {
        font-size: 35px;
        color: ${({ theme }) => theme.colors.blue};
    }
    button {
        border: 0;
        background-color: inherit;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
            transform: scale(1.1);
        }
        &:focus {
            outline: none;
        }
    }
`

export const Title = styled.div`
    display:flex;
    color: ${({ theme }) => theme.colors.orange};
    background-color:red;
    font-size: 1rem;
    height: 2.6rem; 
    line-height: 2.6rem;

`
export const Button = styled.button`
`
export const ButtonCanBeDisabled = styled.button<{disabled: boolean}>`
    svg {
        color: ${({ theme, disabled }) => disabled === true? "grey": theme.colors.blue};
    }
`