import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import userEvent from "@testing-library/user-event";
import Confirmation from "./Confirmation";

const mockedConfirmAction = jest.fn();

describe("Confirmation component", () => {
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                    <Confirmation message="unfollow the playlist" confirm={mockedConfirmAction}/>
            </ThemeProvider>
        );
    });
    it("shows the right message", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                    <Confirmation message="unfollow the playlist" confirm={mockedConfirmAction}/>
            </ThemeProvider>
        );

        const message = getByTestId("message")
        expect(message.textContent).toContain('unfollow the playlist')
    });
    it("calls confirmAction method with correct argument if confirmed", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                    <Confirmation message="unfollow the playlist" confirm={mockedConfirmAction}/>
            </ThemeProvider>
        );

        const confirmButton = getByTestId("confirm-button")
        await userEvent.click(confirmButton)

        expect(mockedConfirmAction).toHaveBeenCalledWith(true)
    });
    it("calls confirmAction method with correct argument if cancelled", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                    <Confirmation message="unfollow the playlist" confirm={mockedConfirmAction}/>
            </ThemeProvider>
        );

        const cancelButton = getByTestId("cancel-button")
        await userEvent.click(cancelButton)

        expect(mockedConfirmAction).toHaveBeenCalledWith(false)
    });
});
