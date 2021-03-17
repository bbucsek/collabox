import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 8.5;
    height: 100vh;
`

export const ContentWrapper = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2rem;
`

export const SongItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
`

export const SongItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.secondaryLight};
    color: ${({ theme }) => theme.colors.whiteFontColor};
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: 100%;
    padding: 1rem;
    margin: 0.5rem;
    filter: blur(0.8px);
`

export const ContentList = styled.ul`
    font-size: 2rem;

`

export const ContentItem = styled.li`
    font-size: 1.5rem;
`