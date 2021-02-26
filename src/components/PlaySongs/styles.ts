import styled from 'styled-components'


export const PlaybackButton = styled.button`
    height: 4rem;
    width: 40vw;
    background-color: ${({ theme }) => theme.colors.yellow};
    border-radius: 10px;
    border: 0;
    font-size: 1.4rem;
    color: white;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.boxShadow};
    &:focus {
        outline: none;
    }
    margin-bottom: 2rem;
    
`
export const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.yellow};
    box-shadow: ${({ theme }) => theme.boxShadow};
    margin-bottom: 2rem;
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

`

export const Title = styled.div`
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  
    align-self: center; 
    color: ${({ theme }) => theme.colors.blueGreen};
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin-top: 15px;
    margin-bottom: 15px;
    &:hover {
        overflow: visible;
    }
`
export const Button = styled.button`
`
export const ButtonCanBeDisabled = styled.button<{disabled: boolean}>`
    svg {
        color: ${({ theme, disabled }) => disabled === true? "grey": theme.colors.blue};
    }
`