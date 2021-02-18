import styled from 'styled-components'

export const Wrapper = styled.div`
    margin: auto;
`

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 40vw;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.lightBlue};
    box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.7);  
`

export const Title = styled.div`
    margin: auto;
    font-weight: 500;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.darkOrange};
`

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;  
    justify-content: center;  
    width: 100%;
    margin: auto;
    padding: 20px;
`

export const HelperText = styled.div`
    margin: auto;
    color: ${({ theme }) => theme.colors.orange};
    font-size: 1rem;
    height: 1.5rem;
`

export const Button = styled.button`
    margin: auto;
    border-radius: 5px;
    border-width: 0px;
    color: ${({ theme }) => theme.colors.backgroundLight};
    background-color:  ${({ theme }) => theme.colors.orange};
    font-size: 1.2rem;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 20px;
    outline: none;
    &:hover {
        transform: scale(1.1);
      }   
`

export const StyledInput = styled.input`
    border-radius: 5px;
    border-width: 0;
    width: 100%;
    color: ${({ theme }) => theme.colors.orange};
    font-size: 1.2rem;
    outline: none;
    line-height: 25px;
    ::placeholder {
        color: ${({ theme }) => theme.colors.red};
        opacity: 0.3;
      }
    `