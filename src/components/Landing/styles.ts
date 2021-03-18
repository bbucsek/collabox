import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 8.5;
`

export const Wrapper = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-wrap: wrap;
`

export const ContentWrapper = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2rem;
    flex: 4.5;
`

export const SongItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    flex: 3;
    @media (max-width: 800px) {
      display: none;
    }   

`

export const SongItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.secondaryLight};
    color: ${({ theme }) => theme.colors.whiteFontColor};
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: 80%;
    padding: 1rem;
    margin: 0.5rem;
    filter: blur(0.8px);
`

export const ContentList = styled.ul`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primaryLight};


`

export const ContentItem = styled.li`
    font-size: 1rem;
    margin: 1rem;
    color: ${({ theme }) => theme.colors.primaryDark};

`

export const Title = styled.div`
    color: ${({ theme }) => theme.colors.primaryLight};
    margin: 2rem 3rem 0;
    font-size: 3rem;


`