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
});
