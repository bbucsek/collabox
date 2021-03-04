import styled from 'styled-components'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    flex: 8.5;
    overflow: scroll;
`

export const Title = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 4rem;
    font-weight: 900;
    margin-top: 2rem;
    margin-bottom: 3rem;
`

export const Subtitle = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
`

export const IconWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    padding: 1rem;
`

export const AddIcon = styled(PlaylistAddIcon)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem !important;
    margin-right: 1rem;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }
`

export const PlayIcon = styled(PlayArrowIcon)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem !important;
    margin-right: 1rem;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }
`

export const InviteIcon = styled(PersonAddIcon)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem !important;
    margin-right: 1rem;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }


`

export const UnsubscribeIcon = styled(SentimentVeryDissatisfiedIcon)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem !important;
    margin-right: 1rem;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }

`