import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 8.5;
    align-items: center;
`

export const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
    width: 40vw;
    border-radius: 10px;
    background-image: linear-gradient(-20deg, ${({ theme }) => theme.colors.primaryLight} 0%, ${({ theme }) => theme.colors.secondaryLight} 100%);
    //background: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.boxShadow};
`

export const Title = styled.div`
    font-weight: 500;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.whiteFontColor};
`

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;  
    align-items: center;  
    width: 100%;
    padding: 20px;
`

export const HelperText = styled.div`
    color: ${({ theme }) => theme.colors.whiteFontColor};
    font-size: 1rem;
    margin: 8px;
`

export const Button = styled.button`
    border-radius: 10px;
    border-width: 0px;
    color: ${({ theme }) => theme.colors.whiteFontColor};
    background-color:  ${({ theme }) => theme.colors.secondary};
    font-size: 1.2rem;
    min-height: 20px;
    outline: none;
    padding: 0.5rem 0.8rem;
    &:hover {
        background-color:  ${({ theme }) => theme.colors.secondaryLight};
    } 
    cursor: pointer;
`

export const StyledInput = styled.input`
    border-radius: 5px;
    border-width: 0;
    width: 100%;
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.2rem;
    outline: none;
    line-height: 25px;
    ::placeholder {
        color: ${({ theme }) => theme.colors.secondary};
        opacity: 0.3;
      }
    `