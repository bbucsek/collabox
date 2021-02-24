import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentPlaylist } from "../../store/slices/playlists/selectors";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import AddSong from "../AddSong";
import PlaySongs from "../PlaySongs";
import { Container, Title } from "./styles";

const PlaylistPage = () => {
    const { id } = useParams<{ id: string }>();
    const currentPlaylist = useSelector(selectCurrentPlaylist);
    const dispatch = useDispatch();

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
            {currentPlaylist && <Title> {currentPlaylist.playlistName} </Title>}
            <PlaySongs/>
            <AddSong />
        </Container>
    );
};

export default PlaylistPage;
