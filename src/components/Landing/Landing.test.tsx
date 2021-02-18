import React from "react";
import { render } from "@testing-library/react";
import Landing from "./Landing";

jest.mock("../AddPlaylist/AddPlaylist", () => {
    return function AddPlaylistMock() {
        return <div>"Dummy"</div>;
    };
});

describe("Landing component", () => {
    it("renders without crashing", () => {
        render(<Landing />);
    });
});
