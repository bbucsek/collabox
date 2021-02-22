import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import { Button, Container, FormContainer, HelperText, StyledInput, Title } from "./styles";

const AddPlaylist = () => {
    const [name, setName] = useState<string>("");
    const [helperText, setHelperText] = useState<string | null>(null);
    const dispatch = useDispatch();

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

    const createPlaylist = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (helperText) {
            return;
        }

        if (name.length === 0) {
            return;
        }
        dispatch(playlistsAsyncActions.createPlaylist(name));
        setName("");
    };

    return (
        <Container>
            <Title>Create a new playlist</Title>
            <FormContainer>
                <StyledInput
                    type="text"
                    placeholder="The name of your playlist"
                    onChange={savePlaylistName}
                    value={name}
                    data-testid="name-input"
                ></StyledInput>
                <HelperText data-testid="helper-text">{helperText}</HelperText>
                <Button onClick={createPlaylist} data-testid="create-button">Create new playlist</Button>
            </FormContainer>
        </Container>
    );
};

export default AddPlaylist;
