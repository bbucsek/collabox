import React from "react";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import PlaylistPage from "./PlaylistPage";
import theme from "../../theme";
import userEvent from "@testing-library/user-event";

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
            partySong: {
                youtubeId: "fake_url",
                title: "Title",
                startTime: 'fake_title'
            },
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

const storeWithoutSong = mockStore({
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
            songs: [],
        },
    },
});

const storeWithOwnPlaylist = mockStore({
    authentication: {
        currentUser: {
            id: "test-id",
            name: "user_name",
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
            ownerName: "user_name",
            users: [],
            songs: [],
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
        storeWithoutSong.clearActions();
        storeWithOwnPlaylist.clearActions();
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
    it("shows play icon if there is at least one song", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const playIcon = getByTestId("playback-icon")
        expect(playIcon).not.toBeNull()
    });
    it("shows PlaySong if there is at least one song and play icon is clicked", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const playbackIcon = getByTestId("playback-icon")
        expect(playbackIcon).not.toBeNull()
    });
    it("does not show play icon if there are no songs", async () => {
        const {queryByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithoutSong}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const playIcon = queryByTestId("play-icon")
        expect(playIcon).toBeNull()
    });
    it("shows the title of the playlist", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const title = getByTestId("title")
        expect(title.textContent).toContain("My cool playlist")
    });
    it("shows invite icon", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const inviteIcon = getByTestId("invite-icon")
        expect(inviteIcon).not.toBeNull()
    });    
    it("shows addsong icon", async () => {
            const {getByTestId} = render(
                <ThemeProvider theme={theme}>
                    <Provider store={store}>
                        <PlaylistPage />
                    </Provider>
                </ThemeProvider>
            );

        const addIcon = getByTestId("addsong-icon")
        expect(addIcon).not.toBeNull()
    });
    it("shows join party when clicked on play icon", async () => {
    const { getByTestId } = render(
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PlaylistPage />
            </Provider>
        </ThemeProvider>)

        const playIcon = getByTestId("playback-icon")
        await userEvent.click(playIcon)
        
        const joinParty = getByTestId("join-party-button")
        expect(joinParty).not.toBeNull()
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
    it("shows the confirmation component if unfollow icon is clicked", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const unfollowIcon = getByTestId("unfollow-icon")
        await userEvent.click(unfollowIcon)

        const confirmationContainer = getByTestId("confirmation-container")
        expect(confirmationContainer).not.toBeNull();
    });
    it("hides the confirmation component and does not dispatch action if unfollow is cancelled in confirmation window", async () => {
        const {getByTestId, queryByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const unfollowIcon = getByTestId("unfollow-icon")
        await userEvent.click(unfollowIcon)
        const cancelButton = getByTestId("cancel-button")
        await userEvent.click(cancelButton)

        const confirmationContainer = queryByTestId("confirmation-container")
        expect(confirmationContainer).toBeNull();
        const actions = store.getActions()
        expect(actions.filter((action: any) => action.type === 'playlists/unfollowPlaylist/pending').length).toEqual(0)
    });
    it("hides the confirmation component and dispatches action if unfollow is confirmed in confirmation window", async () => {
        const {getByTestId, queryByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const unfollowIcon = getByTestId("unfollow-icon")
        await userEvent.click(unfollowIcon)
        const confirmButton = getByTestId("confirm-button")
        await userEvent.click(confirmButton)

        const confirmationContainer = queryByTestId("confirmation-container")
        expect(confirmationContainer).toBeNull();
        const actions = store.getActions()
        expect(actions.filter((action: any) => action.type === 'playlists/unfollowPlaylist/pending').length).toEqual(1)
    });
    it("shows the confirmation component if delete icon is clicked", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithOwnPlaylist}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );
        const deleteIcon = getByTestId("delete-icon")
        await userEvent.click(deleteIcon)

        const confirmationContainer = getByTestId("confirmation-container")
        expect(confirmationContainer).not.toBeNull();
    });
    it("hides the confirmation component and does not dispatch action if delete is cancelled in confirmation window", async () => {
        const {getByTestId, queryByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithOwnPlaylist}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const deleteIcon = getByTestId("delete-icon")
        await userEvent.click(deleteIcon)
        const cancelButton = getByTestId("cancel-button")
        await userEvent.click(cancelButton)

        const confirmationContainer = queryByTestId("confirmation-container")
        expect(confirmationContainer).toBeNull();
        const actions = storeWithOwnPlaylist.getActions()
        expect(actions.filter((action: any) => action.type === 'playlists/deletePlaylist/pending').length).toEqual(0)
    });
    it("hides the confirmation component and dispatches action if delete is confirmed in confirmation window", async () => {
        const {getByTestId, queryByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithOwnPlaylist}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );
        const deleteIcon = getByTestId("delete-icon")
        await userEvent.click(deleteIcon)
        const confirmButton = getByTestId("confirm-button")
        await userEvent.click(confirmButton)

        const confirmationContainer = queryByTestId("confirmation-container")
        expect(confirmationContainer).toBeNull();
        const actions = storeWithOwnPlaylist.getActions()
        expect(actions.filter((action: any) => action.type === 'playlists/deletePlaylist/pending').length).toEqual(1)
    });
});
