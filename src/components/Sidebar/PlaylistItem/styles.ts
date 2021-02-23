import styled from 'styled-components'

export const Container = styled.div`
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