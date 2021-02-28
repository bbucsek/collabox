import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { selectCurrentPlaylist } from "../../store/slices/playlists/selectors";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import Playlist from "../../types/Playlist";
import { Button, Container, FormWrapper, HelperText, StyledInput, Title } from "./styles";

const AddPlaylist = () => {
    const [name, setName] = useState<string>("");
    const [helperText, setHelperText] = useState<string | null>(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const createdPlaylist: Playlist = useSelector(selectCurrentPlaylist)

    const savePlaylistName = (event: ChangeEvent<HTMLInputElement>) => {
        let name = event.target.value;
        if (name.length === 0) {
            setHelperText("Cannot be empty!");
            setName("");
        } else if (name.length > 50) {
            setName(name);
            setHelperText("Too long name for the playlist!");
        } else {
            setName(name);
            setHelperText(null);
        }
    };

    const createPlaylist = async () => {
        const promise = await dispatch(playlistsAsyncActions.createPlaylist(name));
        history.push(`playlist/${promise.payload}`)
    } 

    const submit = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (helperText) {
            return;
        }

        if (name.length === 0) {
            return;
        }
        setName("");
        createPlaylist();
    };


    useEffect(() => {
        if (!createdPlaylist?.id){
            return
        }
        
    },[createdPlaylist])

    return (
        <Container>
            <Title>Create a new playlist</Title>
            <FormWrapper>
                <StyledInput
                    type="text"
                    placeholder="The name of your playlist"
                    onChange={savePlaylistName}
                    value={name}
                    data-testid="name-input"
                ></StyledInput>
                <HelperText data-testid="helper-text">{helperText}</HelperText>
                <Button onClick={submit} data-testid="create-button">Create new playlist</Button>
            </FormWrapper>
        </Container>
    );
};

export default AddPlaylist;
