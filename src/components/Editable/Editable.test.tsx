import React from "react";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import userEvent from "@testing-library/user-event";
import Editable from './Editable'
import { act } from "react-dom/test-utils";

const mockStore = configureMockStore([thunk]);
const storeWhereOwner = mockStore({
    authentication: {
        currentUser: {
            id: "test-user-id",
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
            owner: "test-user-id",
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

const storeWhereNotOwner = mockStore({
    authentication: {
        currentUser: {
            id: "test-user-id",
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
            owner: "not-test-user-id",
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

describe("PlaylistPage", () => {
    beforeEach(() => {
        storeWhereOwner.clearActions();
        storeWhereNotOwner.clearActions();
    });

    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWhereOwner}>
                    <Editable playlistName="fake_playlist_name"/>
                </Provider>
            </ThemeProvider>
        );
    });

    it("not renders the input field when edit icon clicked", async () => {
        const { queryByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWhereNotOwner}>
                    <Editable playlistName="fake_playlist_name"/>
                </Provider>
            </ThemeProvider>
        );

        const editIcon = queryByTestId("edit-icon")

        expect(editIcon).toBeNull();
    });

    it("renders the input field when edit icon clicked", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={storeWhereOwner}>
                    <Editable playlistName="fake_playlist_name"/>
                </Provider>
            </ThemeProvider>
        );

        const editIcon = getByTestId("edit-icon")
        await userEvent.click(editIcon)
        const editTitleInputField = getByTestId('title-input')

        expect(editTitleInputField).not.toBeNull();
    });

    
});
