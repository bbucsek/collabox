import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    flex: 8.5;
    height: 100vh;
`

export const Title = styled.div`
    color: ${({ theme }) => theme.colors.lightGreen};
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 3rem;
`