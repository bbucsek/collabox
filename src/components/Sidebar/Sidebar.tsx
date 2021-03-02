import React, { useEffect } from 'react'
import { Container, Title, Logout, Subtitle, Wrapper, Icon } from './styles'
import { signOut } from '../../service/authentication'
import PlaylistItem from './PlaylistItem'
import { playlistsAsyncActions } from '../../store/slices/playlists/slice'
import { useDispatch } from 'react-redux'
import { selectCurrentUser } from '../../store/slices/authentication/selectors'
import { selectOtherPlaylists, selectOwnPlaylists } from '../../store/slices/playlists/selectors'
import { useSelector } from 'react-redux'
import PlaylistData from '../../types/PlaylistData'
import { useHistory } from 'react-router-dom';

const Sidebar = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(selectCurrentUser)
    const ownPlaylists = useSelector(selectOwnPlaylists)
    const otherPlaylists = useSelector(selectOtherPlaylists)

    useEffect(() => {
        dispatch(playlistsAsyncActions.subscribeToOwnPlaylists(currentUser.id))
        dispatch(playlistsAsyncActions.subscribeToOtherPlaylists(currentUser.id))

        return () => {
            dispatch(playlistsAsyncActions.unsubscribeFromOwnPlaylists(currentUser.id))
            dispatch(playlistsAsyncActions.unsubscribeFromOtherPlaylists(currentUser.id))
        }
    }, [dispatch, currentUser])

    const handleLogout = () => {
        signOut()
    }

    const handleTitleClick = () => {
        history.push('/')
    }

    const createPlaylist = () => {
        history.push('/')
    }

    const followPlaylist = () => {
        history.push('/follow')
    }

    return (
        <Container>
            <Title onClick={handleTitleClick}>
                Collabox
            </Title>
            <Wrapper>
                <Subtitle>
                    My playlists
                </Subtitle>
                <Icon onClick={createPlaylist}/>
            </Wrapper>
            {ownPlaylists?.map((playlist: PlaylistData) => {
                return <PlaylistItem key={playlist.id} playlist={playlist} />
            })}
            <Wrapper>
                <Subtitle>
                    Others' playlists
                </Subtitle>
                <Icon onClick={followPlaylist}/>
            </Wrapper>
            {otherPlaylists?.map((otherPlaylist: PlaylistData) => {
                return <PlaylistItem key={otherPlaylist.id} playlist={otherPlaylist} />
            })}
            <Logout onClick={handleLogout}>logout</Logout>
        </Container>
    )
}

export default Sidebar
