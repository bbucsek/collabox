import React from "react";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import PlaylistPage from "./PlaylistPage";
import theme from "../../theme";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    authentication: {
        currentUser: {
            id: "test-id",
            name: "test-user",
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
            owner: "fake_user_id",
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
        loading: {
            createPlaylistLoading: false,
            addSongLoading: false,
            getPlaylists: false,
        },
    },
});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: "fake_playlist_id",
    }),
}));

describe("PlaylistPage", () => {
    beforeEach(() => {
        store.clearActions();
    });
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );
    });
    it("dispatches actions to subscribe to playlist and songs when mounted", () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const actions = store.getActions();
        expect(actions[0].type).toEqual("playlists/subscribeToPlaylist/pending");
        expect(actions[1].type).toEqual("playlists/subscribeToSongsCollection/pending");
    });
    it("dispatches actions to unsubscribe from playlist and songs when unmounted", () => {
        const { unmount } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );
        
        unmount();

        const actions = store.getActions();
        expect(actions[2].type).toEqual("playlists/unsubscribeFromPlaylist/pending");
        expect(actions[3].type).toEqual("playlists/unsubscribeFromSongsCollection/pending");
    });
});