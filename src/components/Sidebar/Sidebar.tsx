import React from 'react'
import { Container, Title, Logout } from './styles'
import { signOut } from '../../service/authentication'
import PlaylistItem from './PlaylistItem'

const Sidebar = () => {

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
