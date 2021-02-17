<<<<<<< HEAD
import React from "react";
import { signOut } from "../../service/authentication";
import AddPlaylist from "../AddPlaylist/AddPlaylist";
import { Container } from "./styles";

const Landing = () => {
    const handleLogout = () => {
        signOut();
    };

    return (
        <Container>
            <button onClick={handleLogout}>logout</button>
            <AddPlaylist />
=======
import React from 'react'
import { Container } from './styles'

const Landing = () => {
    
    return (
        <Container>
            hello
>>>>>>> feat: add style to login page. create sidebar.
        </Container>
    );
};

export default Landing;
