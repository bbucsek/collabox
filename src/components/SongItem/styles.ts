import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.lightGreen};
    color: ${({ theme }) => theme.colors.whiteFontColor};
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: 100%;
    padding: 1rem;
    margin: 0.5rem 0;
    font-size: 1rem;
`