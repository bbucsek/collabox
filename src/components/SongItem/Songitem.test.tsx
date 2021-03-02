import React from "react";
import { render } from "@testing-library/react";
import Songitem from "./SongItem";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";

const testSong = {
    id: "fake_id",
    youtubeId: "fake_url",
    title: "Title",
    votes: 0,
    userId: "fake_user_id",
    userName: 'fake_user_name'
};

describe("Songitem component", () => {
    it("renders without crashing", () => {
        render(
            <ThemeProvider theme={theme}>
                <Songitem song={testSong}/>
            </ThemeProvider>
        );
    });

    it("renders the songitem with the right title", () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <Songitem song={testSong}/>
            </ThemeProvider>
        );

        const song = getByText('Title');

        expect(song).not.toBeNull()
    });
});
