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
import { useHistory } from 'react-router-dom';

const Sidebar = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(selectCurrentUser)
    const ownPlaylists = useSelector(selectOwnPlaylists)

    useEffect(() => {
        dispatch(playlistsAsyncActions.getCurrentUserPlaylists(currentUser.id))
        dispatch(playlistsAsyncActions.getCurrentUserOtherPlaylists(currentUser.id))
    }, [dispatch, currentUser])

    const handleLogout = () => {
        signOut()
    }

    const handleTitleClick = () => {
        history.push('/')
    }

    return (
        <Container>
            <Title onClick={handleTitleClick}>Collabox</Title>
            <Subtitle>My playlists</Subtitle>
            {ownPlaylists?.map((playlist: PlaylistData) => {
                return <PlaylistItem key={playlist.id} playlist={playlist} />
            })}
            <Logout onClick={handleLogout}>logout</Logout>
        </Container>
    )
}

export default Sidebar
