import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

export const Container = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column;
    padding: 1rem;
`

export const Title = styled.div`
    font-size: 3rem;
    font-weight: 100;
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

export const Logout = styled.button`
    margin-top: 1rem;
    align-self: center;
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.whiteFontColor};
    border-radius: 10px;
    padding: 10px 15px;
    border-width: 0;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.colors.blueActive};
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