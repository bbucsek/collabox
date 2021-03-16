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
            ownerName: "fake_user_name",
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
            id: "user-id",
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
            owner: "user-id",
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
    it("shows tooltip for addsong icon", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

    const addIcon = getByTestId("addsong-icon")
    await userEvent.hover(addIcon)

    const addSongTooltip = getByTestId("addsong-tooltip")
    expect(addSongTooltip).not.toBeNull()
    });
    it("shows play icon and start party icon if there is at least one song", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithOwnPlaylist}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const playIcon = getByTestId("playback-icon")
        expect(playIcon).not.toBeNull()
        const startPartyIcon = getByTestId("start-party-icon")
        expect(startPartyIcon).not.toBeNull()
    });
    it("shows tooltip for playback  icon", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

    const playIcon = getByTestId("playback-icon")
    await userEvent.hover(playIcon)

    const playbackTooltip = getByTestId("playback-tooltip")
    expect(playbackTooltip).not.toBeNull()
    });
    it("shows tooltip for start party icon", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithOwnPlaylist}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

    const startPartyIcon = getByTestId("start-party-icon")
    await userEvent.hover(startPartyIcon)

    const startPartyTooltip = getByTestId("start-party-tooltip")
    expect(startPartyTooltip).not.toBeNull()
    });
    it("does not show playback icon and start party icon if there are no songs", async () => {
        const {queryByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithoutSong}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const playIcon = queryByTestId("play-icon")
        expect(playIcon).toBeNull()
        const startPartyIcon = queryByTestId("start-party-icon")
        expect(startPartyIcon).toBeNull()
    });
    it("does not show player if the playback icon is not clicked", async () => {
        const {queryByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const player = queryByTestId("playback-container");
        expect(player).toBeNull();
    });
    it("shows player if there is at least one song and playback icon is clicked", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const playbackIcon = getByTestId("playback-icon")
        await userEvent.click(playbackIcon)

        const player = getByTestId("playback-container");
        expect(player).not.toBeNull();
    });
    it("shows player if there is at least one song and start party icon is clicked", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithOwnPlaylist}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const startPartyIcon = getByTestId("start-party-icon")
        await userEvent.click(startPartyIcon)

        const player = getByTestId("playback-container-party");
        expect(player).not.toBeNull();
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
    it("shows the owner for followed playlist", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const ownerName = getByTestId("owner-name")
        expect(ownerName.textContent).toContain("fake_user_name")
    });
    it("does not show the owner for own playlist", () => {
        const {queryByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithOwnPlaylist}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const ownerName = queryByTestId("owner-name")
        expect(ownerName).toBeNull()
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
    it("shows tooltip for invite icon", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithOwnPlaylist}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

    const inviteIcon = getByTestId("invite-icon")
    await userEvent.hover(inviteIcon)

    const inviteTooltip = getByTestId("invite-tooltip")
    expect(inviteTooltip).not.toBeNull()
    });  
    it("shows playlist id if invite icon is clicked", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const inviteIcon = getByTestId("invite-icon")
        await userEvent.click(inviteIcon)

        const inviteId = getByTestId("invite-id")
        expect(inviteId.textContent).toContain("fake_playlist_id")
    });  
    it("shows delete icon", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithOwnPlaylist}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

    const deleteIcon = getByTestId("delete-icon")
    expect(deleteIcon).not.toBeNull()
    });
    it("shows tooltip for delete icon", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWithOwnPlaylist}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

    const deleteIcon = getByTestId("delete-icon")
    await userEvent.hover(deleteIcon)

    const deleteTooltip = getByTestId("delete-tooltip")
    expect(deleteTooltip).not.toBeNull()
    }); 
    it("shows unfollow icon for others' playlist", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

    const unfollowIcon = getByTestId("unfollow-icon")
    expect(unfollowIcon).not.toBeNull()
    });
    it("shows tooltip for unfollow icon", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

    const unfollowIcon = getByTestId("unfollow-icon")
    await userEvent.hover(unfollowIcon)

    const inviteTooltip = getByTestId("unfollow-tooltip")
    expect(inviteTooltip).not.toBeNull()
    }); 
    it("shows live party if there is a live party for followed playlist", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

        const joinParty = getByTestId("join-party")
        expect(joinParty).not.toBeNull()
    }); 
    it("shows tooltip for live party", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PlaylistPage />
                </Provider>
            </ThemeProvider>
        );

    const joinParty = getByTestId("join-party")
    await userEvent.hover(joinParty)

    const joinPartyTooltip = getByTestId("join-party-tooltip")
    expect(joinPartyTooltip).not.toBeNull()
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
        const deleteIcon = getByTestId("delete-playlist-icon")
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

        const deleteIcon = getByTestId("delete-playlist-icon")
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
        const deleteIcon = getByTestId("delete-playlist-icon")
        await userEvent.click(deleteIcon)
        const confirmButton = getByTestId("confirm-button")
        await userEvent.click(confirmButton)

        const confirmationContainer = queryByTestId("confirmation-container")
        expect(confirmationContainer).toBeNull();
        const actions = storeWithOwnPlaylist.getActions()
        expect(actions.filter((action: any) => action.type === 'playlists/deletePlaylist/pending').length).toEqual(1)
    });
});
