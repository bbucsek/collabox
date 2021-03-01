import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../store/slices/authentication/selectors";
import { selectCurrentPlaylist } from "../../store/slices/playlists/selectors";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import AddSong from "../AddSong";
import PlaySongs from "../PlaySongs";
import { Button, Container, Title } from "./styles";

const PlaylistPage = () => {
    const { id } = useParams<{ id: string }>();
    const currentPlaylist = useSelector(selectCurrentPlaylist);
    const currentUser = useSelector(selectCurrentUser);
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


if (currentPlaylist && currentUser && (currentPlaylist.owner !== currentUser.id)) {
    return (
    <Container>
        {currentPlaylist && <Title> {currentPlaylist.playlistName} </Title>}
        {currentPlaylist.ownerName && <Button onClick={unFollow}> Unfollow</Button> }
        <PlaySongs/>
        <AddSong />
    </Container>)
}

return (
        <Container>
            {currentPlaylist && <Title> {currentPlaylist.playlistName} </Title>}
            <PlaySongs/>
            <AddSong />
        </Container>
    );
};

export default PlaylistPage;
