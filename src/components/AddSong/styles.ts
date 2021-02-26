import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.lightBlue};
    box-shadow: ${({ theme }) => theme.boxShadow};
`

export const Title = styled.div`
    font-weight: 500;
    font-size: 1.4rem;
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.darkOrange};
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;  
    align-items: center; 
    width: 100%;
    padding: 20px;
`

export const HelperText = styled.div`
    color: ${({ theme }) => theme.colors.orange};
    font-size: 1rem;
    height: 1.5rem;
`

export const Button = styled.button`
    margin: auto;
    border-radius: 5px;
    border-width: 0px;
    color: white;
    background-color:  ${({ theme }) => theme.colors.yellow};
    font-size: 1.2rem;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 20px;
    outline: none;
    transition: 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    } 
    cursor: pointer;
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