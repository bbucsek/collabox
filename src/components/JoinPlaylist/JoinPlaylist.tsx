import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import { Button, Container, FormWrapper, HelperText, StyledInput, Title } from "./styles";

const JoinPlaylist = () => {
    const [id, setId] = useState<string>("");
    const [helperText, setHelperText] = useState<string | null>(null);
    const dispatch = useDispatch();

    const saveId = (event: ChangeEvent<HTMLInputElement>) => {
        let id = event.target.value.trim();
        if (id.length === 0) {
            setHelperText("Cannot be empty!");
            setId("");
        } else if (id.length > 20) {
            setId(id);
            setHelperText("The playlist Id cannot be more that 20 characters!");
        } else {
            setId(id);
            setHelperText(null);
        }
    };

    const createPlaylist = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (helperText) {
            return;
        }

        if (id.length === 0) {
            return;
        }

        if (id.length < 20) {
            setHelperText("The playlist Id must be 20 character long!")
            return;
        }
        console.log('will dispatch')
        dispatch(playlistsAsyncActions.joinPlaylist(id));
        setId("");
    };

    return (
        <Container>
            <Title>Join a playlist</Title>
            <FormWrapper>
                <StyledInput
                    type="text"
                    placeholder="Playlist Id"
                    onChange={saveId}
                    value={id}
                    data-testid="id-input"
                ></StyledInput>
                <HelperText data-testid="helper-text">{helperText}</HelperText>
                <Button onClick={createPlaylist} data-testid="join-button">Join a playlist</Button>
            </FormWrapper>
        </Container>
    );
};

export default JoinPlaylist;
