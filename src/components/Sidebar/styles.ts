import styled from 'styled-components';

export const Container = styled.div`
    height: inherit;
    display: flex;
    flex: 1.5;
    flex-direction: column;
    border-right: solid 1px black;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.lightGreen};
`

export const Title = styled.div`
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
    align-self: center;
    cursor: pointer;
`

export const Subtitle = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue};
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
    cursor: pointer;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.blue};
    font-weight: 400;
    font-size: 1rem;
    margin-left: 1rem;
    transition: 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1)
    }

`