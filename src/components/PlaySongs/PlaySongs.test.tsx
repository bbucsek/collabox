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
            owner: "test-id",
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

const storeWithParty = mockStore({
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
            partySong:{ 
                youtubeId: "fake_id",
                title: "Title",},
            songs: [
                {
                    id: "fake_id",
                    youtubeId: "fake_id",
                    title: "Title",
                    votes: 0,
                    userId: "fake_user_id",
                },
            ],
        },
    },
});


describe("PlaySongs", () => {
    beforeEach(() => {
        store.clearActions();
        storeWithParty.clearActions();
    });
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs isParty={false} closePlayer={() => {}} />
                </Provider>
            </ThemeProvider>
        );
    });
    it("disables skipback button when playback is started", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                <PlaySongs isParty={false} closePlayer={() => {}} />
                </Provider>
            </ThemeProvider>
        );

        const skipBackButton = getByTestId("skip-back");
        expect(skipBackButton).not.toBeEnabled();
    });
    it("shows song title when playback is started", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                <PlaySongs isParty={false} closePlayer={() => {}} />
                </Provider>
            </ThemeProvider>
        );

        const title = getByTestId("playback-title")
        expect(title).toHaveTextContent(/Title/i)
    });
    it("shows mute icon when playback is started", async () => {
        const { queryByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                <PlaySongs isParty={false} closePlayer={() => {}} />
                </Provider>
            </ThemeProvider>
        );

        const muteButton = queryByTestId("mute-icon");
        expect(muteButton).not.toBeNull();
    });
    it("calls props function when the player is closed during playback", async () => {
        const mockedCloseFunction = jest.fn()
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs isParty={false} closePlayer={mockedCloseFunction} />
                </Provider>
            </ThemeProvider>
        );

        const closeButton = getByTestId("close-button")
        await userEvent.click(closeButton)

        expect(mockedCloseFunction).toHaveBeenCalled()
    });
    it("shows party playback container when there is a live party", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithParty}>
                <PlaySongs isParty={true} closePlayer={() => {}} />
                </Provider>
            </ThemeProvider>
        );

        const playbackContainer = getByTestId("playback-container-party");
        expect(playbackContainer).not.toBeNull();
    });
    it("shows mute button when there is a live party", async () => {
        const { queryByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                <PlaySongs isParty={true} closePlayer={() => {}} />
                </Provider>
            </ThemeProvider>
        );

        const muteButton = queryByTestId("mute-button");
        expect(muteButton).not.toBeNull();
    });
    it("shows song title when there is a live party", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithParty}>
                    <PlaySongs isParty={true} closePlayer={() => {}} />
                </Provider>
            </ThemeProvider>
        );

        const title = getByTestId("party-title")
        expect(title).toHaveTextContent(/Title/i)
    });
    it("calls props function when the player is closed during a party", async () => {
        const mockedCloseFunction = jest.fn()
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithParty}>
                    <PlaySongs isParty={true} closePlayer={mockedCloseFunction} />
                </Provider>
            </ThemeProvider>
        );

        const closeButton = getByTestId("close-button")
        await userEvent.click(closeButton)

        expect(mockedCloseFunction).toHaveBeenCalled()
    });
});
