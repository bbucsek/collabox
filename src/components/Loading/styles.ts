import styled from 'styled-components'

export const LoadingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const Load = styled.div`
    border: 16px solid  ${({ theme }) => theme.colors.disabled}; 
    border-top: 16px solid ${({ theme }) => theme.colors.blue}; 
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
}
`