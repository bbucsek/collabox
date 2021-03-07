import React from 'react'
import { useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Song from '../../types/Song'
import { Container, SongTitle, AddedBy, VoteCount, VoteButtons, DeleteIcon } from './styles'
import { playlistsAsyncActions } from '../../store/slices/playlists/slice';

type SongProps = {
    song: Song
}


const SongItem = ({ song }: SongProps) => {
    const dispatch = useDispatch()
    
    const deleteSong = () => {
        dispatch(playlistsAsyncActions.deleteSong(song.id))
    }

    return (
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
            <DeleteIcon onClick={deleteSong}/>
        </Container>
    )
}

export default SongItem
