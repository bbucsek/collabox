import React from "react";
import { render } from "@testing-library/react";
import AddSong from "./AddSong";
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
                <AddSong />{" "}
            </ThemeProvider>
        );
    });
    it("shows helper text when given input is empty", async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <AddSong />{" "}
            </ThemeProvider>
        );

        const input = getByTestId("url-input");
        await userEvent.type(input, "Oopps");
        await userEvent.clear(input);

        const helperText = getByTestId("helper-text");
        expect(helperText.textContent).toEqual("Cannot be empty!");
    });
    it("dispatches action when helper text is null, url is not null and button is clicked", async () => {
        mockedDispatch.mockImplementation(() => {});
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <AddSong />{" "}
            </ThemeProvider>
        );

        const input = getByTestId("url-input");
        await userEvent.type(input, "fake url");
        const button = getByTestId("submit-button");
        await userEvent.click(button);
        expect(mockedDispatch).toBeCalled();
    });
    it("does not dispatch action when helper text is not null and button is clicked", async () => {
        mockedDispatch.mockImplementation(() => {});
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <AddSong />{" "}
            </ThemeProvider>
        );

        const input = getByTestId("url-input");
        await userEvent.type(input, "www.");
        await userEvent.clear(input);
        const button = getByTestId("submit-button");
        await userEvent.click(button);

        expect(mockedDispatch).not.toBeCalled();
    });
    it("does not dispatch action when helper text is null, but input is empty and button is clicked", async () => {
        mockedDispatch.mockImplementation(() => {});
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <AddSong />{" "}
            </ThemeProvider>
        );

        const button = getByTestId("submit-button");
        await userEvent.click(button);

        expect(mockedDispatch).not.toBeCalled();
    });
    it("clears the input field when the playlist creation is started", async () => {
        mockedDispatch.mockImplementation(() => {});
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <AddSong />{" "}
            </ThemeProvider>
        );

        const input = getByTestId("url-input");
        await userEvent.type(input, "fake url");
        const button = getByTestId("submit-button");
        await userEvent.click(button);

        expect(input.textContent).toEqual("");
    });
});
