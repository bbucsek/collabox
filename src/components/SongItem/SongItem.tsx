import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Song from '../../types/Song'
import { Container, SongTitle, AddedBy, VoteCount, VoteButtons, DeleteIcon } from './styles'
import { playlistsAsyncActions } from '../../store/slices/playlists/slice';
import Confirmation from '../Confirmation';
import { useSelector } from 'react-redux';
import { selectCurrentPlaylist } from '../../store/slices/playlists/selectors';
import { selectCurrentUser } from '../../store/slices/authentication/selectors';

type SongProps = {
    song: Song
}

const SongItem = ({ song }: SongProps) => {
    const currentUser = useSelector(selectCurrentUser);
    const currentPlaylist = useSelector(selectCurrentPlaylist)
    const isOwner = currentUser?.name === currentPlaylist?.ownerName;
    const [confirmationIsVisible, setConfirmationIsVisible] = useState(false)
    const dispatch = useDispatch()
    
    const confirmAction = (isConfirmed: boolean) => {
        if (isConfirmed) {
            dispatch(playlistsAsyncActions.deleteSong(song.id))
        }
        setConfirmationIsVisible(false)
    }

    const deleteOnClick = () => {
        setConfirmationIsVisible(true)
    }

    return (
        <>
        <Container>
            <SongTitle>
                {song.title}
            </SongTitle>
            <AddedBy>
                {`added by: ${song.userName}`}
            </AddedBy>
            <VoteCount>
                {`votes: ${song.votes}`}
            </VoteCount>
            <VoteButtons>
                <AddIcon />
                <RemoveIcon />
            </VoteButtons>
            {isOwner && <DeleteIcon onClick={deleteOnClick} data-testid="delete-icon"/>}
        </Container>
        {confirmationIsVisible && <Confirmation message={"delete this song"} confirm={confirmAction} data-testid="confirmation-container"/>}
        </>
    )
}

export default SongItem
