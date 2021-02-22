import React from "react";
import { render } from "@testing-library/react";
import PlaylistItem from "./PlaylistItem";
import PlaylistData from "../../../types/PlaylistData";

const item: PlaylistData = {
    id: 'test-id',
    owner: 'test-owner',
    playlistName: 'test-name',
}

describe("PlaylistItem component", () => {
    it("renders without crashing", () => {
        render(<PlaylistItem playlist={item}/>);
    });

    it("renders the name of the playlist", () => {
        const { getByText } = render(
            <PlaylistItem playlist={item}/>
        );
        const playListName = getByText('test-name')

        expect(playListName).not.toBeNull()
    });
});
