import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import FollowPlaylist from "./FollowPlaylist";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import userEvent from "@testing-library/user-event";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    playlists: {
        ownPlaylists: [],
        otherPlaylists: [],
        currentPlaylist: {
            id: "fake_playlist_id",
            playlistName: "My cool playlist",
            owner: "fake_user_id",
            songs: [],
        },
    },
});

const mockHistoryPush = jest.fn()
 
jest.mock('react-router-dom', () => ({
 useHistory: () => ({
   push: mockHistoryPush,
 }),
}))


describe("FollowPlaylist component", () => {
    beforeEach(() => {
        store.clearActions();
    })
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <FollowPlaylist />
                </Provider>
            </ThemeProvider>
        );
    });
    it("shows helper text when given playlistid is too long", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <FollowPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const input = getByTestId("id-input");
        await userEvent.type(input, "1111111111111111111111111111111111111111111111111111111111111111111");

        const helperText = getByTestId("helper-text");
        expect(helperText.textContent).toEqual("The playlist Id cannot be more that 20 characters!");
    });
    it("shows helper text when given playlist is empty", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <FollowPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const input = getByTestId("id-input");
        await userEvent.type(input, "1111");
        await userEvent.clear(input);

        const helperText = getByTestId("helper-text");
        expect(helperText.textContent).toEqual("Cannot be empty!");
    });
    it("dispatches action when helper text is null, id is given and button is clicked", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <FollowPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const input = getByTestId("id-input");
        await userEvent.type(input, "iVod41jo1VLHH9Eb4fXA");
        const button = getByTestId("follow-button");
        await userEvent.click(button);

        const actions = store.getActions();
        expect(actions[0].type).toEqual('playlists/followPlaylist/pending');
    });
    it("does not dispatch action when helper text is not null and button is clicked", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <FollowPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const input = getByTestId("id-input");
        await userEvent.type(input, "Oopps");
        await userEvent.clear(input);
        const button = getByTestId("follow-button");
        await userEvent.click(button);

        const actions = store.getActions();
        expect(actions[0]).toBeUndefined();
    });
    it("does not dispatch action when helper text is null, but id is empty and button is clicked", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <FollowPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const button = getByTestId("follow-button");
        await userEvent.click(button);

        const actions = store.getActions();
        expect(actions[0]).toBeUndefined();
    });
});
