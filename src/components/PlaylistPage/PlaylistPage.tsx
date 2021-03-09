import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../store/slices/authentication/selectors";
import { selectCurrentPlaylist } from "../../store/slices/playlists/selectors";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import AddSong from "../AddSong";
import PlaySongs from "../PlaySongs";
import { 
    IconWrapper,
    Container,
    Subtitle,
    Title,
    AddIcon,
    InviteIcon,
    PlayIcon,
    UnsubscribeIcon,
    DeleteIcon,
 } from "./styles";
import Songlist from "../Songlist";
import Confirmation from "../Confirmation";

const PlaylistPage = () => {
    const { id } = useParams<{ id: string }>();
    const currentPlaylist = useSelector(selectCurrentPlaylist);
    const currentUser = useSelector(selectCurrentUser);
    const [addSongActive, setAddSongActive] = useState<boolean>(false);
    const [inviteActive, setInviteActive] = useState<boolean>(false);
    const [playerActive, setPlayerActive] = useState<boolean>(false);
    const [confirmationIsVisible, setConfirmationIsVisible] = useState<boolean>(false)
    const [confirmationText, setConfirmationText] = useState<string>("")
    const isOwner = currentUser?.name === currentPlaylist?.ownerName;
    const dispatch = useDispatch();
    const history = useHistory();

    const unFollowOnClick = () => {
        setConfirmationIsVisible(true)
        setConfirmationText("unfollow the playlist")
    }

    const deleteOnClick = () => {
        setConfirmationIsVisible(true)
        setConfirmationText("delete the playlist")
    }

    const confirmAction = (isConfirmed: boolean) => {
        if (isConfirmed && confirmationText.includes("unfollow")){
            unFollow();
        }
        else if (isConfirmed && confirmationText.includes("delete")){
            deletePlaylist()
        }
        setConfirmationIsVisible(false)
        setConfirmationText("")
    }

    const unFollow = async () => {
        await dispatch(playlistsAsyncActions.unfollowPlaylist(id))
        history.push('/')
    }

    const deletePlaylist = async () => {
        dispatch(playlistsAsyncActions.deletePlaylist(id))
        history.push('/')
    }

    useEffect(() => {
        dispatch(playlistsAsyncActions.subscribeToPlaylist(id));
        dispatch(playlistsAsyncActions.subscribeToSongsCollection(id));

        return () => {
            dispatch(playlistsAsyncActions.unsubscribeFromPlaylist(id));
            dispatch(playlistsAsyncActions.unsubscribeFromSongsCollection(id));
        };
    }, [dispatch, id]);

    return (
            <Container>
                <Title data-testid="title"> {currentPlaylist?.playlistName} </Title>
                <IconWrapper>
                    <AddIcon onClick={() => setAddSongActive(!addSongActive)} data-testid="addsong-icon"/>
                    {currentPlaylist?.songs?.length > 0 && <PlayIcon onClick={() => setPlayerActive(!playerActive)} data-testid="playback-icon"/>}
                    <InviteIcon onClick={() => setInviteActive(!inviteActive)} data-testid="invite-icon"/>
                    {!isOwner && <UnsubscribeIcon onClick={unFollowOnClick} data-testid="unfollow-icon"/>}
                    {inviteActive && <Subtitle> invite with this id: {currentPlaylist?.id} </Subtitle>}
                    {isOwner && <DeleteIcon onClick={deleteOnClick} data-testid="delete-icon"/>}
                </IconWrapper>
                {playerActive && currentPlaylist?.songs?.length > 0 && <PlaySongs/>}
                {addSongActive && <AddSong />}
                <Songlist />
                {confirmationIsVisible && <Confirmation message={confirmationText} confirm={confirmAction}/>}
            </Container>
        );
};


export default PlaylistPage;
