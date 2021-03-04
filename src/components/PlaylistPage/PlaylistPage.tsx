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
 } from "./styles";
import Songlist from "../Songlist";

const PlaylistPage = () => {
    const { id } = useParams<{ id: string }>();
    const currentPlaylist = useSelector(selectCurrentPlaylist);
    const currentUser = useSelector(selectCurrentUser);
    const [addSongActive, setAddSongActive] = useState(false);
    const [inviteActive, setInviteActive] = useState(false);
    const [playerActive, setPlayerActive] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const unFollow = async () => {
        await dispatch(playlistsAsyncActions.unfollowPlaylist(id))
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
                <Title> {currentPlaylist?.playlistName} </Title>
                <IconWrapper>
                    <AddIcon onClick={() => setAddSongActive(!addSongActive)}/>
                    <PlayIcon onClick={() => setPlayerActive(!playerActive)}/>
                    <InviteIcon onClick={() => setInviteActive(!inviteActive)}/>
                    <UnsubscribeIcon onClick={unFollow}/>
                    {inviteActive && <Subtitle> invite with this id: {currentPlaylist?.id} </Subtitle>}
                </IconWrapper>
                {playerActive && currentPlaylist?.songs?.length > 0 && <PlaySongs/>}
                {addSongActive && <AddSong />}
                <Songlist />
            </Container>
        );
};

export default PlaylistPage;
