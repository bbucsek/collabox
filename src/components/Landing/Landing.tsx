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
        </Container>
    );
};

export default Landing;
