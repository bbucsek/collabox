import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.secondaryLight};
    color: ${({ theme }) => theme.colors.whiteFontColor};
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: 80%;
    margin: 0.5rem;
    padding: 1rem;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;  
    align-items: center; 
    width: 100%;
    padding: 8px;
`

export const HelperText = styled.div`
    color: ${({ theme }) => theme.colors.whiteFontColor};
    font-size: 1rem;
    height: 1.5rem;
`

export const Button = styled.button`
    display: none;
`

export const StyledInput = styled.input`
    border-radius: 5px;
    border-width: 0;
    width: 100%;
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1rem;
    outline: none;
    line-height: 32px;
    ::placeholder {
        color: ${({ theme }) => theme.colors.secondary};
        opacity: 0.3;
        text-align: center;
      }
    `