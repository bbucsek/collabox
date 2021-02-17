import React from 'react'
import { Container } from './styles'
import { signOut } from '../../service/authentication'

const Sidebar = () => {

    const handleLogout = () => {
        signOut()
    }
    return (
        <Container>
            <button onClick={handleLogout}>logout</button>
        </Container>
    )
}

export default Sidebar
