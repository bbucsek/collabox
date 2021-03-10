import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Song from '../../types/Song'
import { playlistsAsyncActions } from '../../store/slices/playlists/slice';
import { selectCurrentPlaylist } from '../../store/slices/playlists/selectors';
import { selectCurrentUser } from '../../store/slices/authentication/selectors';
import Confirmation from '../Confirmation';
import { Container, SongTitle, AddedBy, VoteCount, VoteButtons, DeleteIcon, UpvoteIcon, DownvoteIcon } from './styles'
import PlaylistType from '../../types/PlaylistType';
import VoteType from '../../types/VoteType';

type SongProps = {
    song: Song
}

const SongItem = ({ song }: SongProps) => {
    const currentUser = useSelector(selectCurrentUser);
    const currentPlaylist = useSelector(selectCurrentPlaylist)
    const isOwner = currentUser?.name === currentPlaylist?.ownerName;
    const playlistType = isOwner? PlaylistType.ownPlaylist :  PlaylistType.followedPlaylist;
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

    const upvote = () => {
        dispatch(playlistsAsyncActions.vote({songId: song.id, voteType: VoteType.upVote, playlistType}))
    }

    const downvote = () => {
        dispatch(playlistsAsyncActions.vote({songId: song.id, voteType: VoteType.downVote, playlistType}))
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
                <UpvoteIcon onClick={upvote} disabled={song.upVoted} data-testid="upvote-icon"/>
                <DownvoteIcon onClick={downvote} disabled={song.downVoted} data-testid="downvote-icon" />
            </VoteButtons>
            {isOwner && <DeleteIcon onClick={deleteOnClick} data-testid="delete-icon"/>}
        </Container>
        {confirmationIsVisible && <Confirmation message={"delete this song"} confirm={confirmAction} data-testid="confirmation-container"/>}
        </>
    )
}

export default SongItem
