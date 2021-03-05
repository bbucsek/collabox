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
    it("disables skipback button when playback is started", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const playbackButton = getByTestId("playback-button");
        await userEvent.click(playbackButton);

        const skipBackButton = getByTestId("skip-back");
        expect(skipBackButton).not.toBeEnabled();
    });
    it("shows song title when playback is started", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const playbackButton = getByTestId("playback-button");
        await userEvent.click(playbackButton);

        const title = getByTestId("playback-title")
        expect(title).toHaveTextContent(/Title/i)
    });
    it("shows mute icon when playback is started", async () => {
        const { queryByTestId, getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const playbackButton = getByTestId("playback-button");
        await userEvent.click(playbackButton);

        const muteButton = queryByTestId("mute-icon");
        expect(muteButton).not.toBeNull();
    });
    it("shows join party button when there is a live party", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithParty}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const joinPartyButton = getByTestId("join-party-button");
        expect(joinPartyButton).not.toBeNull();
    });
    it("shows start party button for own playlist", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const startPartyButton = getByTestId("start-party-button");
        expect(startPartyButton).not.toBeNull();
    });
    it("hides start party button and shows playback container when party is started", async () => {

        const { queryByTestId, getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const startPartyButton = getByTestId("start-party-button");
        await userEvent.click(startPartyButton);

        setTimeout(() => {
            const startPartyButtonAgain = queryByTestId("start-party-button");
            const partyPlaybackContainer = queryByTestId("playback-container-party");
            expect(startPartyButtonAgain).toBeNull();
            expect(partyPlaybackContainer).not.toBeNull();
        }, 1000); 
    });
    it("shows song title when party is started", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const startPartyButton = getByTestId("start-party-button");
        await userEvent.click(startPartyButton);

        setTimeout(() => {
            const title = getByTestId("party-title")
            expect(title).toHaveTextContent(/Title/i)
        }, 1000)
    });
    it("hides join party button and shows playback container when party is joined", async () => {
        const { queryByTestId, getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithParty}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const joinPartyButton = getByTestId("join-party-button");
        await userEvent.click(joinPartyButton);

        const joinPartyButtonAgain = queryByTestId("join-party-button");
        const partyPlaybackContainer = queryByTestId("playback-container-party");
        expect(joinPartyButtonAgain).toBeNull();
        expect(partyPlaybackContainer).not.toBeNull();
    });
    it("dispatches action when party is started", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaySongs />
                </Provider>
            </ThemeProvider>
        );

        const joinPartyButton = getByTestId("start-party-button");
        await userEvent.click(joinPartyButton);

        const actions = store.getActions();
        expect(actions[0].type).toEqual('playlists/updatePartySong/pending')
    });
});
