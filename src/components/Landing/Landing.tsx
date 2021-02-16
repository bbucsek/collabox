import React from 'react'
import { signOut } from '../../service/authentication'

const Landing = () => {

    const handleLogout = () => {
        signOut()
    }
    
    return (
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Landing
