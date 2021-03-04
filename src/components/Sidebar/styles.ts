import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

export const Container = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column;
    padding: 1rem;
`

export const Title = styled.div`
    background: -webkit-linear-gradient(-20deg, ${({ theme }) => theme.colors.secondary} 0%, ${({ theme }) => theme.colors.primary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Megrim;
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 1rem;
    align-self: center;
    cursor: pointer;
    letter-spacing: 4px;
    border-bottom: 8px solid ${({ theme }) => theme.colors.secondary};
`

export const Subtitle = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
`

export const Logout = styled.div`
    margin-top: 1rem;
    align-self: flex-start;
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }
`

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Icon = styled(AddIcon)`
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
        border-radius: 5px;
        border-width: 0px;
        background-color:  ${({ theme }) => theme.colors.secondaryDark};
    }

`