import React, { useEffect } from 'react'
import { Container, Title, Logout, Subtitle } from './styles'
import { signOut } from '../../service/authentication'
import PlaylistItem from './PlaylistItem'
import { playlistsAsyncActions } from '../../store/slices/playlists/slice'
import { useDispatch } from 'react-redux'
import { selectCurrentUser } from '../../store/slices/authentication/selectors'
import { selectOwnPlaylists } from '../../store/slices/playlists/selectors'
import { useSelector } from 'react-redux'
import PlaylistData from '../../types/PlaylistData'

const Sidebar = () => {

    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const ownPlaylists = useSelector(selectOwnPlaylists)

    useEffect(() => {
        dispatch(playlistsAsyncActions.getCurrentUserPlaylists(currentUser.id))
    }, [dispatch, currentUser])

    const handleLogout = () => {
        signOut()
    }
    return (
        <Container>
            <Title>Collabox</Title>
            <Subtitle>My playlists</Subtitle>
            {ownPlaylists?.map((playlists: PlaylistData) => {
                return <PlaylistItem playlist={playlists} />
            })}
            <Logout onClick={handleLogout}>logout</Logout>
        </Container>
    )
}

export default Sidebar
