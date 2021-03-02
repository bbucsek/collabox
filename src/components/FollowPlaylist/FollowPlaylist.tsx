import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectOwnPlaylistIds } from "../../store/slices/playlists/selectors";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import { Button, Container, FormWrapper, HelperText, StyledInput, Title, Wrapper } from "./styles";

const FollowPlaylist = () => {
    const ownPlaylistIds = useSelector(selectOwnPlaylistIds);
    const [id, setId] = useState<string>("");
    const [helperText, setHelperText] = useState<string | null>(null);
    const dispatch = useDispatch();
    const history = useHistory();

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


    const followPlaylist = async () => {
        const result = await dispatch(playlistsAsyncActions.followPlaylist(id));
        if (result.payload === 'playlist_followed'){
            history.push(`/playlist/${id}`)
        }
    } 

    const submit = (event: FormEvent<HTMLButtonElement>) => {
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
        
        if (ownPlaylistIds.includes(id)) {
            setHelperText("You cannot follow your own playlist!")
            return;
        }

        setId("");
        followPlaylist();

    };

    return (
        <Container>
            <Wrapper>
                <Title>Follow a playlist</Title>
                <FormWrapper>
                    <StyledInput
                        type="text"
                        placeholder="Playlist Id"
                        onChange={saveId}
                        value={id}
                        data-testid="id-input"
                    />
                    <HelperText data-testid="helper-text">{helperText}</HelperText>
                    <Button onClick={submit} data-testid="follow-button">Follow a playlist</Button>
                </FormWrapper>
            </Wrapper>
        </Container>
    );
};

export default FollowPlaylist;
