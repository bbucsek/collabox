import React from "react";
import { render } from "@testing-library/react";
import Notifications from "./Notifications";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import SEVERITY from "../../types/Severity";

const mockedSelector = jest.fn();
jest.mock("react-redux", () => ({
    useSelector: () => mockedSelector,
}));

const fake_notifications = [{
    id: 1,
    message: "Fake error",
    severity: SEVERITY.Error,
    },
    {
    id: 2,
    message: "Fake info",
    severity: SEVERITY.Info,
    },
]

describe("Notifications component", () => {
    it("renders without crashing", () => {
        mockedSelector.mockImplementationOnce(() => fake_notifications)
        render(
            <ThemeProvider theme={theme}>
                <Notifications />
            </ThemeProvider>
        );
    });

});
