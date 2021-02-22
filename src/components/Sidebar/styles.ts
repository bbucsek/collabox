import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex: 1.5;
    flex-direction: column;
    border-right: solid 1px black;
    padding: 1rem;
    background: #058585;
`

export const Title = styled.div`
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 1rem;
    align-self: center;
`

export const Subtitle = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    color: #003f5a;
    margin-bottom: 1rem;
`

export const Logout = styled.button`
    margin-top: 1rem;
    align-self: center;
    background: #003f5a;
    color: #ebd9c8;
    border-radius: 10px;
    padding: 10px 15px;
    border-width: 0;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #024c6b;
    }
`