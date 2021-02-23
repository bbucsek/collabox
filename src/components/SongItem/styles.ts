import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.lightGreen};
    color: ${({ theme }) => theme.colors.whiteFontColor};
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: 100%;
    padding: 1rem;
    margin-top: 0.5rem;
`

export const SongTitle = styled.div`
    font-size: 0.8rem;
    flex: 5;
`

export const AddedBy = styled.div`
    font-size: 0.5rem;
    flex: 1;
`

export const VoteCount = styled.div`
    font-size: 0.5rem;
    flex: 1;
`

export const VoteButtons = styled.div`
    flex: 1;
`