import React from "react";
import { render } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const ownPlaylistData: PlaylistData = {
    id: 'test-song-id',
    owner: 'Test User',
    playlistName: 'test-playlist'
  }

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  authentication: {
    currentUser: {
      name: 'Test User',
      email: 'testuser@gmail.com',
      id: 'uuid01234',
    } 
  },
  playlists: {
    ownPlaylists: [ownPlaylistData],
    otherPlaylists: null,
    CachedPlaylistData: null,
    CurrentPlaylist: null,
    loading: {
      createPlaylistLoading: false,
    }
  }
});

describe("Sidebar component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );
    });

    it("renders the own playlist", () => {
        const { getByText } = render(
            <Provider store={store}>
                <Sidebar />
            </Provider>
        );
        const playlistItem = getByText('test-playlist')

        expect(playlistItem).not.toBeNull()
    });
});
