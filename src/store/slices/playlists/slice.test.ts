import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import PlaylistsState from './types/PlaylistsState'
import youtubeApi from "../../../utils/youtubeApi"
import playlistsReducer, { playlistsActions, playlistsAsyncActions } from './slice'
import { firestoreApi } from "../../../service/firestoreApi"
import PlaylistData from "../../../types/PlaylistData";

jest.mock("../../../service/firestoreApi")
const mockedFirestoreApi = firestoreApi as jest.Mocked<typeof firestoreApi>

jest.mock('../../../utils/youtubeApi')
const mockedYoutubeApi = youtubeApi as jest.Mocked<typeof youtubeApi>

const state: PlaylistsState = {
    ownPlaylists: null,
    otherPlaylists: null,
    currentPlaylist: null,
    loading: {
      createPlaylistLoading: false,
      getPlaylists: false,
      addSongLoading: false,
    }
}

const newState: PlaylistsState = {
    ownPlaylists: null,
    otherPlaylists: null,
  currentPlaylist: {
    id: "fake_playlist_id",
    playlistName: "My cool playlist",
    owner: "fake_user_id",
    users: [],
    songs: [],
    },
    loading: {
      createPlaylistLoading: false,
      getPlaylists: false,
      addSongLoading: false,
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

const storeWithoutUser = mockStore({
  authentication: {
    currentUser: null,
  },
  playlists: {
    ownPlaylists: null,
    otherPlaylists: null,
    currentPlaylist: null,
    loading: {
      createPlaylistLoading: false,
      addSongLoading: false,
    }
  }
});

const storeWithoutCurrentPlaylist = mockStore({
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
    currentPlaylist: null,
    loading: {
      createPlaylistLoading: false,
      addSongLoading: false,
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
        users: [],
        songs: []
      }
      const nextState = playlistsReducer(state, playlistsActions.SET_PLAYLIST(updatedPlaylist))

      expect(nextState).toEqual(newState)
    })
  })
  describe('SET_SONGS action', () => {
    it('sets the state with the correct value', () => {
      const updatedSongs = [{
          id: "fake_id",
          youtubeId: "fake_url",
          title: "Title", 
          votes: 0,
          userId: "fake_user_id"
      }]
      const expectedState = {
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
      }]
        },
        loading: {
          createPlaylistLoading: false,
          addSongLoading: false,
          getPlaylists: false,
        }
    }
      const nextState = playlistsReducer(newState, playlistsActions.SET_SONGS(updatedSongs))

      expect(nextState).toEqual(expectedState)
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
    expect(actions[3].type).toEqual('playlists/createPlaylist/fulfilled')
      expect(actions[4].type).toEqual('playlists/subscribeToPlaylist/fulfilled')
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

describe('VerifyUrl slice async action', () => {
  beforeEach(() => {
      store.clearActions()
})
  it('returns error action if url is not valid', async () => {
    await store.dispatch(playlistsAsyncActions.verifyUrl("www.bad"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/verifyUrl/rejected')
    expect(actions[1].payload).toEqual("no_youtube_url")
  })
  it('returns error action if song is too long', async () => {
    (mockedYoutubeApi as any as jest.Mock).mockResolvedValueOnce({ title: "Title", duration: "PT15M", youtubeId: "fake_youtubeId" })
    await store.dispatch(playlistsAsyncActions.verifyUrl("https://www.youtube.com/watch?v=rVgkIGzGzaU&ab_channel=SevenBeatsMusic"))


    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/verifyUrl/rejected')
    expect(actions[1].payload).toEqual("video_too_long")
  })
  it('returns the right action if the song is verified', async () => {
    (mockedYoutubeApi as any as jest.Mock).mockResolvedValueOnce({ title: "Title", duration: "PT1M", youtubeId: "fake_youtubeId" })
    await store.dispatch(playlistsAsyncActions.verifyUrl("https://www.youtube.com/watch?v=rVgkIGzGzaU&ab_channel=SevenBeatsMusic"))
    
    
    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/addSong/pending')
    expect(actions[2].type).toEqual('playlists/verifyUrl/fulfilled')
    expect(actions[2].payload).toEqual('url_verified')
    })
})

describe('AddSong slice async action', () => {
  beforeEach(() => {
      store.clearActions()
})
  it('returns error action if there is no logged in user', async () => {
    await storeWithoutUser.dispatch(playlistsAsyncActions.addSong({youtubeId: "fake_youtubeId", title: "Fake_title"}))

    const actions = storeWithoutUser.getActions()
    expect(actions[1].type).toEqual('playlists/addSong/rejected')
    expect(actions[1].payload).toEqual("no_currentUser")
  })
  it('returns error action if there is no current playlist', async () => {
    await storeWithoutCurrentPlaylist.dispatch(playlistsAsyncActions.addSong({youtubeId: "fake_youtubeId", title: "Fake_title"}))

    const actions = storeWithoutCurrentPlaylist.getActions()
    expect(actions[1].type).toEqual('playlists/addSong/rejected')
    expect(actions[1].payload).toEqual("no_currentPlaylist")
  })
  it('returns the right action if the song is added', async () => {
    mockedFirestoreApi.addSong.mockResolvedValueOnce('fake_firestore_id')
    await store.dispatch(playlistsAsyncActions.addSong({youtubeId: "fake_youtubeId", title: "Fake_title"}))
    
    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/addSong/fulfilled')
    expect(actions[1].payload).toEqual('song_added')
  })
  it('returns error action if there is database error', async () => {
    mockedFirestoreApi.addSong.mockRejectedValueOnce('firestore error')
    await store.dispatch(playlistsAsyncActions.addSong({youtubeId: "fake_youtubeId", title: "Fake_title"}))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/addSong/rejected')
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
})

describe('UnsubscribeFromPlaylist slice async action', () => {
  beforeEach(() => {
    store.clearActions()
  })
  it('returns the right action if unsubscribed from playlist', async () => {
    mockedFirestoreApi.unsubscribeFromPlaylist.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.unsubscribeFromPlaylist("fake_id"))

    const actions = store.getActions()

    expect(actions[1].type).toEqual('playlists/unsubscribeFromPlaylist/fulfilled')
    expect(actions[1].payload).toEqual('unsubscribed_from_playlist')
  })

  it('returns error action if database is down', async () => {
    mockedFirestoreApi.unsubscribeFromPlaylist.mockRejectedValueOnce("database error")
    await store.dispatch(playlistsAsyncActions.unsubscribeFromPlaylist("fake_id"))

    const actions = store.getActions()

    expect(actions[1].type).toEqual('playlists/unsubscribeFromPlaylist/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })
})

describe('SubscribeToSongsCollection slice async action', () => {
  beforeEach(() => {
    store.clearActions()
  })
  it('returns the right action if subscribed to songs collection', async () => {
    mockedFirestoreApi.subscribeToSongsCollection.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.subscribeToSongsCollection("fake_id"))

    const actions = store.getActions()

    expect(actions[1].type).toEqual('playlists/subscribeToSongsCollection/fulfilled')
    expect(actions[1].payload).toEqual('subscribed_to_songscollection')
  })

  it('returns error action if database is down', async () => {
    mockedFirestoreApi.subscribeToSongsCollection.mockRejectedValueOnce("database error")
    await store.dispatch(playlistsAsyncActions.subscribeToSongsCollection("fake_id"))

    const actions = store.getActions()

    expect(actions[1].type).toEqual('playlists/subscribeToSongsCollection/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })
})

describe('UnsubscribeFromSongsCollection slice async action', () => {
  beforeEach(() => {
    store.clearActions()
  })
  it('returns the right action if unsubscribed from songs collection', async () => {
    mockedFirestoreApi.unsubscribeFromSongsCollection.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.unsubscribeFromSongsCollection("fake_id"))

    const actions = store.getActions()

    expect(actions[1].type).toEqual('playlists/unsubscribeFromSongsCollection/fulfilled')
    expect(actions[1].payload).toEqual('unsubscribed_from_songscollection')
  })

  it('returns error action if database is down', async () => {
    mockedFirestoreApi.unsubscribeFromSongsCollection.mockRejectedValueOnce("database error")
    await store.dispatch(playlistsAsyncActions.unsubscribeFromSongsCollection("fake_id"))

    const actions = store.getActions()

    expect(actions[1].type).toEqual('playlists/unsubscribeFromSongsCollection/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })
})

  describe('getOwnPlaylists async action', () => {
    beforeEach(() => {
      store.clearActions()
    })
  
    it('returns the right action and payload if gets own playlists', async () => {
      mockedFirestoreApi.getUserOwnPlayLists.mockResolvedValueOnce([ownPlaylistData])
      await store.dispatch(playlistsAsyncActions.getCurrentUserPlaylists("fake_id"))
  
      const actions = store.getActions()
      
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

    it("sets loading to false when action is rejected", () => {
      const nextState = playlistsReducer(
        state,
        playlistsAsyncActions.getCurrentUserPlaylists.rejected()
      )
  
      expect(nextState.loading.getPlaylists).toBe(false)
    })

    it("sets loading to true when action is pending", () => {
      const nextState = playlistsReducer(
        state,
        playlistsAsyncActions.getCurrentUserPlaylists.pending()
      )
  
      expect(nextState.loading.getPlaylists).toBe(true)
    })

    it("sets loading to false when action is fulfilled", () => {
      const nextState = playlistsReducer(
        state,
        playlistsAsyncActions.getCurrentUserPlaylists.fulfilled()
      )
  
      expect(nextState.loading.getPlaylists).toBe(false)
    })
  })
