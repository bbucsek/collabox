import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import { Button, Form, StyledInput, Container, HelperText } from "./styles";

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
            <Form>
                <StyledInput
                    type="text"
                    placeholder="add new song as a youtube url"
                    onChange={saveSongUrl}
                    value={url}
                    data-testid="url-input"
                />
                <Button onClick={submitSongUrl} data-testid="submit-button" />
            </Form>
            <HelperText data-testid="helper-text">{helperText}</HelperText>
        </Container>
    );
};

export default AddSong;
