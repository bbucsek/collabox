import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import { Button, Container, FormContainer, HelperText, StyledInput, Title, Wrapper } from "./styles";

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
        console.log("will disp");
        if (helperText ) {
            return;
        }

        if (url.length === 0) {
            return
        }
        dispatch(playlistsAsyncActions.verifyUrl(url));
        setUrl("");
    };

    return (
        <Wrapper>
            <Container>
                <Title>Add a new song</Title>
                <FormContainer>
                    <StyledInput
                        type="text"
                        placeholder="Youtube url"
                        onChange={saveSongUrl}
                        value={url}
                        data-testid="name-input"
                    ></StyledInput>
                    <HelperText data-testid="helper-text">{helperText}</HelperText>
                    <Button onClick={submitSongUrl} data-testid="submit-button">
                        Submit song
                    </Button>
                </FormContainer>
            </Container>
        </Wrapper>
    );
};

export default AddSong;
