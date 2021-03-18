import React from "react";
import { render } from "@testing-library/react";
import Landing from "./Landing";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";

jest.mock("../AddPlaylist/AddPlaylist", () => {
    return function AddPlaylistMock() {
        return <div>"Dummy"</div>;
    };
});

describe("Landing component", () => {
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <Landing />
            </ThemeProvider>
        );
    });
});
