import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.secondary};
    box-shadow: ${({ theme }) => theme.boxShadow};
    margin-bottom: 2rem;
    button {
        border: 0;
        background-color: inherit;
        cursor: pointer;
        transition: 0.1s ease-in-out;
        &:hover {
            transform: scale(1.1);
        }
        &:focus {
            outline: none;
        }
    }
`

export const OptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
`

export const Option = styled.button`
    height: 3rem;
    padding: 0 1rem;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
    border: 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.whiteFontColor};
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.boxShadow};
    margin: 1rem;
    
    &:focus {
        outline: none;
    }
    
    &:hover {
        background-color: ${({ theme }) => theme.colors.secondaryLight};
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
    color: ${({ theme }) => theme.colors.whiteFontColor};
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin-bottom: 15px;
`

export const Button = styled.button`
    border: 0;
    background-color: inherit;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`

export const ButtonCanBeDisabled = styled.button<{disabled: boolean}>`
    
    svg {
        color: ${({ theme, disabled }) => disabled === true ? theme.colors.disabled: theme.colors.blue};
        cursor: ${({ theme, disabled }) => disabled === true ? "not-allowed" : "pointer"};
    }
`

export const Close = styled(CloseIcon)`
    align-self: flex-end;
    margin: 5px 5px 0px 0px;
    color: ${({ theme }) => theme.colors.whiteFontColor};
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`