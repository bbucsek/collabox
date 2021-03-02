import React from "react";
import { render } from "@testing-library/react";
import Songlist from "./Songlist";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

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
      ownPlaylists: null,
      otherPlaylists: null,
      currentPlaylist: {
        id: "fake_playlist_id",
        playlistName: "My cool playlist",
        owner: "fake_user_id",
        users: [],
        songs: [{
          id: "fake_id",
          youtubeId: "fake_url",
          title: "Title",
          votes: 0,
          userId: "fake_user_id"
        }],
      },
      loading: {
        createPlaylistLoading: false,
        addSongLoading: false,
      }
    }
  });



describe("Songlist component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Songlist />
                </ThemeProvider>
            </Provider>
        );
    });

    it("renders the current playlist", () => {
        const { getByText } = render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Songlist />
                </ThemeProvider>
            </Provider>
        );

        const song = getByText('Title');

        expect(song).not.toBeNull()
    });
});
