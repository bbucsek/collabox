import React from "react";
import AddPlaylist from "../AddPlaylist/AddPlaylist";
import JoinPlaylist from "../JoinPlaylist";
import { Container } from "./styles";

const Landing = () => {

    return (
        <Container>
            <AddPlaylist />
            <JoinPlaylist/>
        </Container>
    )}

export default Landing;
