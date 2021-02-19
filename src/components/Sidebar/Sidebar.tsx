import React, { useEffect, useState } from 'react'
import { Container, Title, Logout } from './styles'
import { signOut } from '../../service/authentication'
import PlaylistItem from './PlaylistItem'
import { playlistsAsyncActions } from '../../store/slices/playlists/slice'
import Playlist from '../../types/Playlist'
import { useDispatch } from 'react-redux'
import { selectCurrentUser } from '../../store/slices/authentication/selectors'
import { useSelector } from 'react-redux'

const Sidebar = () => {

    const [playlists, setPlaylists] = useState<Playlist>()
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)

    useEffect(() => {
        dispatch(playlistsAsyncActions.getCurrentUserPlaylists(currentUser.id))
    }, [dispatch, currentUser])

    const handleLogout = () => {
        signOut()
    }
    return (
        <Container>
            <Title>Collabox</Title>
            <PlaylistItem name={'joszika playlist'} />
            <PlaylistItem name={'pistike playlist'} />
            <PlaylistItem name={'gabika playlist'} />
            <Logout onClick={handleLogout}>logout</Logout>
        </Container>
    )
}

export default Sidebar
