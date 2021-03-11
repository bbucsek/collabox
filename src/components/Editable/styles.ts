import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-top: 2rem;
    margin-bottom: 3rem;
`

export const Title = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 4rem;
    font-weight: 900;
`

export const EditTitleIcon = styled(EditIcon)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem !important;
    margin-left: 1rem;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }
`

export const InputField = styled.input`
    background: inherit;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 4rem;
    font-weight: 900;
    border: none;
`

export const Form = styled.form`
`

export const FormButton = styled.button`
    display: none;
`