import React from "react";
import { render } from "@testing-library/react";
import NotificationItem from "./NotificationItem";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import SEVERITY from "../../types/Severity";
import userEvent from "@testing-library/user-event";

const mockedDispatch = jest.fn();
jest.mock("react-redux", () => ({
    useDispatch: () => mockedDispatch,
}));

const fake_error = {
    id: 1,
    message: "Fake error",
    severity: SEVERITY.Error,
}

const fake_warning = {
    id: 2,
    message: "Fake warning",
    severity: SEVERITY.Warning,
}

const fake_info = {
    id: 3,
    message: "Fake info",
    severity: SEVERITY.Info,
}

describe("NotificationItem component", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.useFakeTimers();
    })
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <NotificationItem notification={fake_warning}/>{" "}
            </ThemeProvider>
        );
        jest.runAllTimers();
    });
    it("dispatches notification delete action if notification is closed", async() => {
        const {getByTestId} = render(
            <ThemeProvider theme={theme}>
                <NotificationItem notification={fake_error}/>{" "}
            </ThemeProvider>
        );

        const closeIcon = getByTestId("close-icon")
        await userEvent.click(closeIcon)

        expect(mockedDispatch).toHaveBeenCalled()
        expect(mockedDispatch.mock.calls[0][0].type).toEqual('notification/DELETE_NOTIFICATION')
        expect(mockedDispatch.mock.calls[0][0].payload).toEqual(1)
    });
    it("dispatches action after 3 seconds for info notification without user interaction", async() => {
        render(
            <ThemeProvider theme={theme}>
                <NotificationItem notification={fake_info}/>{" "}
            </ThemeProvider>
        );
       
        jest.runAllTimers();
        
        expect(mockedDispatch).toHaveBeenCalled()
        expect(mockedDispatch.mock.calls[0][0].type).toEqual('notification/DELETE_NOTIFICATION')
        expect(mockedDispatch.mock.calls[0][0].payload).toEqual(3)
    });
    it("dispatches action after 3 seconds for warning notification without user interaction", async() => {
        mockedDispatch.mockImplementationOnce(()=> {})
        render(
            <ThemeProvider theme={theme}>
                <NotificationItem notification={fake_warning}/>{" "}
            </ThemeProvider>
        );
        jest.runAllTimers();
    
        expect(mockedDispatch).toHaveBeenCalled()
        expect(mockedDispatch.mock.calls[0][0].type).toEqual('notification/DELETE_NOTIFICATION')
        expect(mockedDispatch.mock.calls[0][0].payload).toEqual(2)
    });
    it("does not dispatch action after 3 seconds for error notification without user interaction", async() => {
        mockedDispatch.mockImplementationOnce(()=> {})
        render(
            <ThemeProvider theme={theme}>
                <NotificationItem notification={fake_error}/>{" "}
            </ThemeProvider>
        );

        jest.runAllTimers();

        expect(mockedDispatch).not.toHaveBeenCalled()
    });
});