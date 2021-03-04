import React from "react";
import { Switch, Route } from "react-router-dom";
import AddPlaylist from "../../components/AddPlaylist";
import FollowPlaylist from "../../components/FollowPlaylist";
import Landing from "../../components/Landing";
import PlaylistPage from "../../components/PlaylistPage";
import Sidebar from "../../components/Sidebar";
import { Container } from "./styles";

export default function PrivateRoutes() {
    return (
        <Container>
            <Sidebar />
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/follow" component={FollowPlaylist} />
                <Route exact path="/playlist/add" component={AddPlaylist} />
                <Route exact path="/playlist/:id" component={PlaylistPage} />
            </Switch>
        </Container>
    );
}
