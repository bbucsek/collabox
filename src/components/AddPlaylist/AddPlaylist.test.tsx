import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import AddPlaylist from "./AddPlaylist";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import userEvent from "@testing-library/user-event";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    playlists: {
        ownPlaylists: null,
        otherPlaylists: null,
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


describe("AddPlaylist component", () => {
    beforeEach(() => {
        store.clearActions();
    })
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <AddPlaylist />
                </Provider>
            </ThemeProvider>
        );
    });
    it("shows helper text when given playlist name is too long", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <AddPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const input = getByTestId("name-input");
        await userEvent.type(input, "Looooooooooooooooooooooooooooooooooooooooooooooooooonnnng playlist name");

        const helperText = getByTestId("helper-text");
        expect(helperText.textContent).toEqual("Too long name for the playlist!");
    });
    it("shows helper text when given playlist is empty", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <AddPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const input = getByTestId("name-input");
        await userEvent.type(input, "Oopps");
        await userEvent.clear(input);

        const helperText = getByTestId("helper-text");
        expect(helperText.textContent).toEqual("Cannot be empty!");
    });
    it("dispatches action when helper text is null and button is clicked", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <AddPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const input = getByTestId("name-input");
        await userEvent.type(input, "My cool playlist");
        const button = getByTestId("create-button");
        await userEvent.click(button);

        const actions = store.getActions();
        expect(actions[0].type).toEqual('playlists/createPlaylist/pending');
    });
    it("does not dispatch action when helper text is not null and button is clicked", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <AddPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const input = getByTestId("name-input");
        await userEvent.type(input, "Oopps");
        await userEvent.clear(input);
        const button = getByTestId("create-button");
        await userEvent.click(button);

        const actions = store.getActions();
        expect(actions[0]).toBeUndefined();
    });
it("does not dispatch action when helper text is null, but name is empty and button is clicked", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <AddPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const button = getByTestId("create-button");
        await userEvent.click(button);

        const actions = store.getActions();
        expect(actions[0]).toBeUndefined();
    });
    it("clears the input field when the playlist creation is started", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <AddPlaylist />
                </Provider>
            </ThemeProvider>
        );

        const input = getByTestId("name-input");
        await userEvent.type(input, "My cool playlist");
        const button = getByTestId("create-button");
        await userEvent.click(button);

        expect(input.textContent).toEqual("");
    });
});
