import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const Title = styled.div`
   font-size: 4rem;
   font-weight: 900;
`

export const SignUp = styled.button`
    width: fit-content;
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