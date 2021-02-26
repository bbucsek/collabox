import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ThemeProvider } from "styled-components";
import PlaySongs from "./PlaySongs";
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

describe("PlaySongs", () => {
    beforeEach(() => {
        store.clearActions();
    });
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );
    });
    it("shows listen button and hides playback container when playback is not started", () => {
        const { queryByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const playbackButton = queryByTestId("playback-button");
        const playbackContainer = queryByTestId("playback-container");
        expect(playbackButton).not.toBeNull();
        expect(playbackContainer).toBeNull();
    });
    it("hides listen button and shows playback container when playback is started", async () => {
        const { queryByTestId, getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const playbackButton = getByTestId("playback-button");
        await userEvent.click(playbackButton);

        const playbackButtonAgain = queryByTestId("playback-button");
        const playbackContainer = queryByTestId("playback-container");
        expect(playbackButtonAgain).toBeNull();
        expect(playbackContainer).not.toBeNull();
    });
    it("disables volumeup button and skipback button when playback is started", async () => {
        const { queryByTestId, getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const playbackButton = getByTestId("playback-button");
        await userEvent.click(playbackButton);

        const skipBackButton = getByTestId("skip-back");
        const volumeUpButton = queryByTestId("volume-up");
        expect(skipBackButton).not.toBeEnabled();
        expect(volumeUpButton).not.toBeEnabled();
    });
});
