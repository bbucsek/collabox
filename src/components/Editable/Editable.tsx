import React, { useState, useEffect, FormEvent } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/authentication/selectors";
import { selectCurrentPlaylist } from "../../store/slices/playlists/selectors";
import { 
    Container, 
    Title, 
    EditTitleIcon, 
    InputField,
    Form,
    FormButton,
} from './styles'
import { selectCurrentPlaylistId } from '../../store/slices/playlists/selectors'
import { playlistsAsyncActions } from '../../store/slices/playlists/slice'

type IProps = {
    playlistName: string,
}

const Editable = ({ playlistName }: IProps) => {

    const [editTitle, setEditTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(playlistName);
    const playlistId: string = useSelector(selectCurrentPlaylistId)
    const currentPlaylist = useSelector(selectCurrentPlaylist);
    const currentUser = useSelector(selectCurrentUser);
    const isOwner = currentUser?.id === currentPlaylist?.owner;
    const dispatch = useDispatch();

    useEffect(() => {
        setEditTitle(false)
    }, [playlistName])

    useEffect(() => {
        setNewTitle(playlistName)
    }, [playlistName])

    const submitTitleChange = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        let res = await dispatch(playlistsAsyncActions.changePlaylistTitle({newTitle, playlistId}))
        if (res.payload === newTitle) {
            setEditTitle(false)
        }
    }

    if (editTitle) {
        return (
            <Container>
                <Form>
                    <InputField 
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        data-testid="title-input"
                    />
                    <FormButton onClick={submitTitleChange} data-testid="submit-button"/>
                </Form>
                <EditTitleIcon onClick={() => setEditTitle(!editTitle)} data-testid="edit-icon"/>
            </Container>
        )
    }

    return (
        <Container>
            <Title>{playlistName}</Title>
            {isOwner && <EditTitleIcon onClick={() => setEditTitle(!editTitle)} data-testid="edit-icon" />}
        </Container>
    )
}

export default Editable
