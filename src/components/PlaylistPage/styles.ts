import styled from 'styled-components'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import DeleteI from '@material-ui/icons/Delete';

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    flex: 8.5;
    overflow: scroll;
`

export const Title = styled.div<{isOwner: boolean}>`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 4rem;
    font-weight: 900;
    margin-top: 2rem;
    margin-bottom: ${({isOwner}) => isOwner? '2rem' : '1rem'};
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
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }
`

export const PlayIcon = styled(PlayArrowIcon)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem !important;
    cursor: pointer;
    margin-left: -0.2rem;
    margin-right: -0.7rem;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }
`
export const PartyIcon = styled(MusicNoteIcon)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem !important;
    cursor: pointer;
    margin-right: -0.4rem;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }
`

export const InviteIcon = styled(PersonAddIcon)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem !important;
    cursor: pointer;
    margin-left: 0.4rem;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }
`

export const UnsubscribeIcon = styled(SentimentVeryDissatisfiedIcon)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem !important;
    cursor: pointer;
    margin-left: 0.3rem;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
    }
`
export const DeleteIcon = styled(DeleteI)`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3rem !important;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.secondaryLight};
        
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
        top: -70%;
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

export const JoinPartyContainer = styled.div`
    color: ${({theme}) => theme.colors.yellow};
    font-size: 1.5rem;
    line-height: 3rem;
    &:hover {
        cursor: pointer;
    }
    `



