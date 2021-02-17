import React from 'react'
import { signOut } from '../../service/authentication'
import { Container } from './styles'

const Landing = () => {

    const handleLogout = () => {
        signOut()
    }
    
    return (
        <Container>
            <button onClick={handleLogout}>logout</button>
        </Container>
    )
}

export default Landing
