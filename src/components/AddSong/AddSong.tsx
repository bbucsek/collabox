import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import { Button, Form, HelperText, StyledInput, Title, Container } from "./styles";

const AddSong = () => {
    const [url, setUrl] = useState<string>("");
    const [helperText, setHelperText] = useState<string | null>(null);
    const dispatch = useDispatch();

    const saveSongUrl = (event: ChangeEvent<HTMLInputElement>) => {
        let url = event.target.value;
        if (url.length === 0) {
            setHelperText("Cannot be empty!");
            setUrl("");
        } else {
            setUrl(url);
            setHelperText(null);
        }
    };

    const submitSongUrl = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (helperText) {
            return;
        }

        if (url.length === 0) {
            return;
        }
        dispatch(playlistsAsyncActions.verifyUrl(url));
        setUrl("");
    };

    return (
        <Container>
            <Title>Add a new song</Title>
            <Form>
                <StyledInput
                    type="text"
                    placeholder="Youtube url"
                    onChange={saveSongUrl}
                    value={url}
                    data-testid="url-input"
                ></StyledInput>
                <HelperText data-testid="helper-text">{helperText}</HelperText>
                <Button onClick={submitSongUrl} data-testid="submit-button">
                    Submit song
                </Button>
            </Form>
        </Container>
    );
};

export default AddSong;
