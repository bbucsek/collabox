import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 100vh;
`

export const Title = styled.div`
    background: -webkit-linear-gradient(-20deg, ${({ theme }) => theme.colors.secondaryLight} 0%, ${({ theme }) => theme.colors.primaryLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Megrim;
    font-size: 8rem;
    font-weight: 700;
    margin: 2rem;
    align-self: center;
    cursor: pointer;
    letter-spacing: 4px;
    border-bottom: 8px solid ${({ theme }) => theme.colors.secondary};
`

export const SignUp = styled.button`
    width: fit-content;
    align-self: center;
    background: -webkit-linear-gradient(-20deg, ${({ theme }) => theme.colors.secondaryLight} 0%, ${({ theme }) => theme.colors.primaryLight} 100%);
    color: ${({ theme }) => theme.colors.whiteFontColor};
    border-radius: 10px;
    padding: 10px 15px;
    border-width: 0;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: -webkit-linear-gradient(-20deg, ${({ theme }) => theme.colors.primaryLight} 0%, ${({ theme }) => theme.colors.secondaryLight} 100%);

    }
`