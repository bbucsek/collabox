import React from "react";
import { render } from "@testing-library/react";
import AddPlaylist from "./AddPlaylist";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import userEvent from "@testing-library/user-event";

const mockedDispatch = jest.fn();
jest.mock("react-redux", () => ({
    useDispatch: () => mockedDispatch,
}));

describe("AddPlaylist component", () => {
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <AddPlaylist />{" "}
            </ThemeProvider>
        );
    });
    it("shows helper text when given playlist name is too long", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <AddPlaylist />{" "}
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
                <AddPlaylist />{" "}
            </ThemeProvider>
        );

        const input = getByTestId("name-input");
        await userEvent.type(input, "Oopps");
        await userEvent.clear(input);

        const helperText = getByTestId("helper-text");
        expect(helperText.textContent).toEqual("Cannot be empty!");
    });
    it("dispatches action when helper text is null and button is clicked", async () => {
        mockedDispatch.mockImplementation(() => {});
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <AddPlaylist />{" "}
            </ThemeProvider>
        );

        const input = getByTestId("name-input");
        await userEvent.type(input, "My cool playlist");
        const button = getByTestId("create-button");
        await userEvent.click(button);
        expect(mockedDispatch).toBeCalled();
    });
    it("does not dispatch action when helper text is not null and button is clicked", async () => {
        mockedDispatch.mockImplementation(() => {});
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <AddPlaylist />{" "}
            </ThemeProvider>
        );

        const input = getByTestId("name-input");
        await userEvent.type(input, "Oopps");
        await userEvent.clear(input);
        const button = getByTestId("create-button");
        await userEvent.click(button);

        expect(mockedDispatch).not.toBeCalled();
    });
    it("clears the input field when the playlist creation is started", async () => {
        mockedDispatch.mockImplementation(() => {});
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <AddPlaylist />{" "}
            </ThemeProvider>
        );

        const input = getByTestId("name-input");
        await userEvent.type(input, "My cool playlist");
        const button = getByTestId("create-button");
        await userEvent.click(button);

        expect(input.textContent).toEqual("");
    });
});
