import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

export const Container = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column;
    padding: 1rem;
`

export const Title = styled.div`
    background: -webkit-linear-gradient(-20deg, ${({ theme }) => theme.colors.secondary} 0%, ${({ theme }) => theme.colors.primary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Megrim;
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 1rem;
    align-self: center;
    cursor: pointer;
    letter-spacing: 4px;
    border-bottom: 8px solid ${({ theme }) => theme.colors.secondary};
`

export const Subtitle = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
`

export const Logout = styled.div`
    margin-top: 1rem;
    align-self: flex-start;
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }
`

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Icon = styled(AddIcon)`
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
        border-radius: 5px;
        border-width: 0px;
        background-color:  ${({ theme }) => theme.colors.secondaryDark};
    }

`

export const TooltipWrapper = styled.div`
    position: relative;
    margin-right: 0.5rem;
`

export const Tooltip = styled.div<{length: string, left: string}>`
    & {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.5s, opacity 0.5s;
        position: absolute;
        top: -100%;
        left: ${(props) => props.left}%;
        z-index: 1;
        min-width: ${(props) => props.length}px;
        padding: 5px;
        border-radius: 6px;
        background-color: ${({theme}) => theme.colors.secondaryLight};
        color: ${({theme}) => theme.colors.whiteFontColor};
        text-align: center;
        
        ${TooltipWrapper}:hover & {
            visibility: visible;
            opacity: 1;
            transition: opacity 0.5s linear;
        }
    }

    &:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: ${({theme}) => theme.colors.secondaryLight} transparent transparent transparent;
    }
`