import React from "react";
import { render } from "@testing-library/react";
import PlaylistItem from "./PlaylistItem";
import PlaylistData from "../../../types/PlaylistData";
import { ThemeProvider } from "styled-components";
import theme from "../../../theme/theme";

const item: PlaylistData = {
    id: 'test-id',
    owner: 'test-owner',
    playlistName: 'test-name',
}

describe("PlaylistItem component", () => {
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <PlaylistItem playlist={item}/>
            </ThemeProvider>
        );
    });

    it("renders the name of the playlist", () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <PlaylistItem playlist={item}/>
            </ThemeProvider>
        );
        const playListName = getByText('test-name')

        expect(playListName).not.toBeNull()
    });
});
