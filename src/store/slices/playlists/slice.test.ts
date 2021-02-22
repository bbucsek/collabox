import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import PlaylistsState from './types/PlaylistsState'
import playlistsReducer, { playlistsActions, playlistsAsyncActions } from './slice'
import { firestoreApi } from "../../../service/firestoreApi"
import PlaylistData from "../../../types/PlaylistData";

jest.mock("../../../service/firestoreApi")
const mockedFirestoreApi = firestoreApi as jest.Mocked<typeof firestoreApi >

const state: PlaylistsState = {
    ownPlaylists: null,
    otherPlaylists: null,
    CurrentPlaylist: null,
    loading: {
      createPlaylistLoading: false,
    }
}

const newState: PlaylistsState = {
    ownPlaylists: null,
    otherPlaylists: null,
    CurrentPlaylist: {
    id: "fake_playlist_id",
    playlistName: "My cool playlist",
    owner: "fake_user_id",
    users: null,
    songs: null,
    },
    loading: {
      createPlaylistLoading: false,
    }
}

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
    ownPlaylists: null,
    otherPlaylists: null,
    CachedPlaylistData: null,
    CurrentPlaylist: null,
    loading: {
      createPlaylistLoading: false,
    }
  }
});

describe('Playlists slice', () => {
  describe('SET_PLAYLIST action', () => {
    it('sets the state with the correct value', () => {
      const updatedPlaylist = {
        id: "fake_playlist_id",
        playlistName: "My cool playlist",
        owner: "fake_user_id",
        users: null,
        songs: null
      }
      const nextState = playlistsReducer(state, playlistsActions.SET_PLAYLIST(updatedPlaylist))

      expect(nextState).toEqual(newState)
    })
  })
})

describe('CreatePlaylist slice async action', () => {
  beforeEach(() => {
      store.clearActions()
})
  it('returns the right actions if playlist is created', async () => {
    mockedFirestoreApi.createPlaylist.mockResolvedValueOnce("new_ID")
      await store.dispatch(playlistsAsyncActions.createPlaylist("My cool playlist"))

    const actions = store.getActions()

    expect(actions[2].type).toEqual('playlists/createPlaylist/fulfilled')
    expect(actions[3].type).toEqual('playlists/subscribeToPlaylist/fulfilled')
  })

  it("sets loading to true when action is pending", () => {
    const nextState = playlistsReducer(
      state,
      playlistsAsyncActions.createPlaylist.pending("fake", "playlist_name")
    )

    expect(nextState.loading.createPlaylistLoading).toBe(true)
  })

  it("sets loading to false when action is fulfilled", () => {
    const nextState = playlistsReducer(
      state,
      playlistsAsyncActions.createPlaylist.fulfilled("", "", "")
    )

    expect(nextState.loading.createPlaylistLoading).toBe(false)
  })

  it("sets loading to false when action is rejected", () => {
    const nextState = playlistsReducer(
      state,
      playlistsAsyncActions.createPlaylist.rejected(null, "", "")
    )

    expect(nextState.loading.createPlaylistLoading).toBe(false)
  })

  it('returns error action if database is down', async () => {
    mockedFirestoreApi.createPlaylist.mockRejectedValueOnce("database down")
    await store.dispatch(playlistsAsyncActions.createPlaylist("My cool playlist"))

    const actions = store.getActions()

    expect(actions[1].type).toEqual('playlists/createPlaylist/rejected')
    expect(actions[1].payload).toEqual('database_error')
    })
})

describe('SubscribeToPlaylist slice async action', () => {
  beforeEach(() => {
    store.clearActions()
  })

  it('returns the right action if subscribed to playlist', async () => {
    mockedFirestoreApi.subscribeToPlaylist.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.subscribeToPlaylist("fake_id"))

    const actions = store.getActions()

    expect(actions[1].type).toEqual('playlists/subscribeToPlaylist/fulfilled')
    expect(actions[1].payload).toEqual('subscribed_to_playlist')
  })

  it('returns error action if database is down', async () => {
    mockedFirestoreApi.subscribeToPlaylist.mockRejectedValueOnce("database error")
    await store.dispatch(playlistsAsyncActions.subscribeToPlaylist("fake_id"))

    const actions = store.getActions()

    expect(actions[1].type).toEqual('playlists/subscribeToPlaylist/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })

  describe('getOwnPlaylists async action', () => {
    beforeEach(() => {
      store.clearActions()
    })
  
    it('returns the right action and payload if gets own playlists', async () => {
      mockedFirestoreApi.getUserOwnPlayLists.mockResolvedValueOnce([ownPlaylistData])
      await store.dispatch(playlistsAsyncActions.getCurrentUserPlaylists("fake_id"))
  
      const actions = store.getActions()
      
      console.log(actions)
      expect(actions[1].type).toEqual('playlists/SET_OWN_PLAYLISTS')
      expect(actions[1].payload).toEqual([ownPlaylistData])
    })

    it('returns error action if database is down', async () => {
      mockedFirestoreApi.getUserOwnPlayLists.mockRejectedValueOnce("database error")
      await store.dispatch(playlistsAsyncActions.getCurrentUserPlaylists("fake_id"))
  
      const actions = store.getActions()
  
      expect(actions[1].type).toEqual('playlists/getCurrentUserPlaylists/rejected')
      expect(actions[1].payload).toEqual('database_error')
    })
  })
})