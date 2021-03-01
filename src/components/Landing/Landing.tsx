import React from "react";
import AddPlaylist from "../AddPlaylist/AddPlaylist";
import FollowPlaylist from "../FollowPlaylist";
import { Container } from "./styles";

const Landing = () => {

    return (
        <Container>
            <AddPlaylist />
            <FollowPlaylist/>
        </Container>
    )}

export default Landing;
