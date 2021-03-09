import React from "react";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Songitem from "./SongItem";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

const testSong = {
    id: "fake_id",
    youtubeId: "fake_url",
    title: "Title",
    votes: 0,
    userId: "fake_user_id",
    userName: 'fake_user_name'
};


const mockStore = configureMockStore([thunk]);
const store = mockStore({
    authentication: {
        currentUser: {
            id: "fake-owner-id",
            name: "fake-owner-name",
            email: "test-user-email",
        },
        loading: false,
    },
    playlists: {
        ownPlaylists: null,
        otherPlaylists: null,
        currentPlaylist: {
            id: "fake_playlist_id",
            playlistName: "My cool playlist",
            ownerName: "fake-owner-name",
            users: [],
            songs: [
                {
                    id: "fake_id",
                    youtubeId: "fake_url",
                    title: "Title",
                    votes: 0,
                    userId: "fake_user_id",
                },
            ],
        },
    },
});

describe("Songitem component", () => {
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store = {store}> 
                    <Songitem song={testSong}/>
                </Provider>
            </ThemeProvider>
        );
    });

    it("renders the songitem with the right title", () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <Provider store = {store}> 
                    <Songitem song={testSong}/>
                </Provider>
            </ThemeProvider>
        );

        const songTitle = getByText('Title');
        expect(songTitle).not.toBeNull()
    });
    it("shows the confirmation component if delete icon is clicked", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store = {store}> 
                    <Songitem song={testSong}/>
                </Provider>
            </ThemeProvider>
        );

        const deleteIcon = getByTestId("delete-icon")
        await userEvent.click(deleteIcon)

        const confirmationContainer = getByTestId("confirmation-container")
        expect(confirmationContainer).not.toBeNull();
    });
    it("hides the confirmation component and does not dispatch action if action is cancelled in confirmation window", async () => {
        const {getByTestId, queryByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store = {store}> 
                    <Songitem song={testSong}/>
                </Provider>
            </ThemeProvider>
        );

        const deleteIcon = getByTestId("delete-icon")
        await userEvent.click(deleteIcon)
        const cancelButton = getByTestId("cancel-button")
        await userEvent.click(cancelButton)

        const confirmationContainer = queryByTestId("confirmation-container")
        expect(confirmationContainer).toBeNull();
        const actions = store.getActions()
        expect(actions.length).toEqual(0)
    });
    it("hides the confirmation component and dispatches action if action is confirmed in confirmation window", async () => {
        const {getByTestId, queryByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store = {store}> 
                    <Songitem song={testSong}/>
                </Provider>
            </ThemeProvider>
        );

        const deleteIcon = getByTestId("delete-icon")
        await userEvent.click(deleteIcon)
        const confirmButton = getByTestId("confirm-button")
        await userEvent.click(confirmButton)

        const actions = store.getActions()
        expect(actions[0].type).toEqual('playlists/deleteSong/pending')
        const confirmationContainer = queryByTestId("confirmation-container")
        expect(confirmationContainer).toBeNull();
    });
});
