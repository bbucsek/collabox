import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import SEVERITY from '../../types/Severity';

export const Container = styled.div<{severity: SEVERITY}>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 10px;
    background-color: ${({severity, theme}) => theme.colors[severity]};
    color: ${({ severity, theme }) => severity === SEVERITY.Warning? theme.colors.blueActive : theme.colors.whiteFontColor};
    box-shadow: ${({ theme }) => theme.boxShadow};
    width: 20rem;
    max-height: 4rem;
    margin-bottom: 0.6rem;
    svg {
        font-size:1rem;
    }
`

export const Close = styled(CloseIcon)`
    margin-top: 5px;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
        border-radius: 5px;
        border-width: 0px;
        background-color:  ${({ theme }) => theme.colors.secondaryDark};
    }
`

export const Message = styled.div`
    margin: 1rem;
`