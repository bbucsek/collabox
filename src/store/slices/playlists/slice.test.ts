import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import PlaylistsState from './types/PlaylistsState'
import youtubeApi from "../../../utils/youtubeApi"
import playlistsReducer, { playlistsActions, playlistsAsyncActions } from './slice'
import { firestoreApi } from "../../../service/firestoreApi"
import VoteType from "../../../types/VoteType";
import PlaylistType from "../../../types/PlaylistType";

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
      followPlaylistLoading: false,
      addSongLoading: false,
    }
}

const newState = {
    ownPlaylists: null,
    otherPlaylists: null,
    currentPlaylist: {
    id: "fake_playlist_id",
    playlistName: "My cool playlist",
    owner: "fake_user_id",
    partySong: null,
    users: [],
    },
    loading: {
      createPlaylistLoading: false,
      followPlaylistLoading: false,
      addSongLoading: false,
    }
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
      partySong: null,
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
      followPlaylistLoading: false,
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
      followPlaylistLoading: false,
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
      followPlaylistLoading: false,
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
        partySong: null,
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
          youtubeId: "fake_youtubeId",
          title: "Title", 
          votes: 0,
          userId: "fake_user_id",
          userName: "fake_user"
      }]
      const expectedState = {
        ownPlaylists: null,
        otherPlaylists: null,
      currentPlaylist: {
        id: "fake_playlist_id",
        playlistName: "My cool playlist",
        owner: "fake_user_id",
        partySong: null,
        users: [],
        songs: [{
          id: "fake_id",
          youtubeId: "fake_youtubeId",
          title: "Title", 
          votes: 0,
          userId: "fake_user_id",
          userName: "fake_user"
      }]
        },
        loading: {
          createPlaylistLoading: false,
          addSongLoading: false,
          followPlaylistLoading: false,
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
    expect(actions[1].type).toEqual('playlists/createPlaylist/fulfilled')
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

describe('DeletePlaylist slice async action', () => {
  beforeEach(() => {
      store.clearActions()
})
  it('returns error action if there is no current playlist', async () => {
    await storeWithoutCurrentPlaylist.dispatch(playlistsAsyncActions.deletePlaylist("fake_playlistId"))

    const actions = storeWithoutCurrentPlaylist.getActions()
    expect(actions[1].type).toEqual('playlists/deletePlaylist/rejected')
    expect(actions[1].payload).toEqual("no_current_playlist")
  })

  it('returns the right actions if playlist is deleted', async () => {
    mockedFirestoreApi.deletePlaylist.mockResolvedValueOnce()
      await store.dispatch(playlistsAsyncActions.deletePlaylist("fake_playlistId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/deletePlaylist/fulfilled')
    expect(actions[1].payload).toEqual('playlist_deleted')
  })

  it('returns error action if database is down', async () => {
    mockedFirestoreApi.deletePlaylist.mockRejectedValueOnce("database down")
    await store.dispatch(playlistsAsyncActions.deletePlaylist("fake_playlistId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/deletePlaylist/rejected')
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
    expect(actions[1].type).toEqual('playlists/checkIfSongExists/pending')
    expect(actions[3].type).toEqual('playlists/verifyUrl/fulfilled')
    expect(actions[3].payload).toEqual('url_verified')
    })
})

describe('AddSong slice async action', () => {
  beforeEach(() => {
      store.clearActions()
      storeWithoutCurrentPlaylist.clearActions()
      storeWithoutUser.clearActions()
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

describe('CheckIfSongExists slice async action', () => {
  beforeEach(() => {
      store.clearActions()
      storeWithoutCurrentPlaylist.clearActions()
      storeWithoutUser.clearActions()
})

  it('returns error action if there is no current playlist', async () => {
    await storeWithoutCurrentPlaylist.dispatch(playlistsAsyncActions.checkIfSongExists({youtubeId: "fake_youtubeId", title: "Fake_title"}))

    const actions = storeWithoutCurrentPlaylist.getActions()
    expect(actions[1].type).toEqual('playlists/checkIfSongExists/rejected')
    expect(actions[1].payload).toEqual("no_currentPlaylist")
  })

  it('returns error action if the song is duplicate', async () => {
    mockedFirestoreApi.checkIfSongExists.mockResolvedValueOnce(true)
    await store.dispatch(playlistsAsyncActions.checkIfSongExists({youtubeId: "fake_youtubeId", title: "Fake_title"}))
    
    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/checkIfSongExists/fulfilled')
    expect(actions[1].payload).toEqual('duplicate_song')
  })

  it('returns the right actions if the song is not a duplicate', async () => {
    mockedFirestoreApi.checkIfSongExists.mockResolvedValueOnce(false)
    await store.dispatch(playlistsAsyncActions.checkIfSongExists({youtubeId: "fake_youtubeId", title: "Fake_title"}))
    
    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/addSong/pending')
    expect(actions[2].type).toEqual('playlists/checkIfSongExists/fulfilled')
    expect(actions[2].payload).toEqual('not_duplicate_song')
  })

  it('returns error action if there is database error', async () => {
    mockedFirestoreApi.checkIfSongExists.mockRejectedValueOnce('firestore error')
    await store.dispatch(playlistsAsyncActions.checkIfSongExists({youtubeId: "fake_youtubeId", title: "Fake_title"}))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/checkIfSongExists/rejected')
  })
})

describe('DeleteSong slice async action', () => {
  beforeEach(() => {
      store.clearActions()
      storeWithoutCurrentPlaylist.clearActions()
      storeWithoutUser.clearActions()
})

  it('returns error action if there is no current playlist', async () => {
    await storeWithoutCurrentPlaylist.dispatch(playlistsAsyncActions.deleteSong("fake_songId"))

    const actions = storeWithoutCurrentPlaylist.getActions()
    expect(actions[1].type).toEqual('playlists/deleteSong/rejected')
    expect(actions[1].payload).toEqual("no_currentPlaylist")
  })

  it('returns the right action if the song is deleted', async () => {
    await store.dispatch(playlistsAsyncActions.deleteSong("fake_songId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/deleteSong/fulfilled')
    expect(actions[1].payload).toEqual("song_deleted")
  })

  it('returns error action if there is database error', async () => {
    mockedFirestoreApi.deleteSong.mockRejectedValueOnce('firestore error')
    await store.dispatch(playlistsAsyncActions.deleteSong("fake_songId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/deleteSong/rejected')
  })
})

describe('Vote slice async action', () => {
  beforeEach(() => {
      store.clearActions()
      storeWithoutCurrentPlaylist.clearActions()
      storeWithoutUser.clearActions()
})

  it('returns the right action if the song is voted on', async () => {
    await store.dispatch(playlistsAsyncActions
      .vote({songId: "fake_songId", voteType: VoteType.upVote, playlistType: PlaylistType.ownPlaylist}))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/vote/fulfilled')
    expect(actions[1].payload).toEqual("voted_on_song")
  })

  it('returns the right error acrion if the the user has already voted', async () => {
    mockedFirestoreApi.checkVoteStatus.mockResolvedValueOnce(1)
    await store.dispatch(playlistsAsyncActions
      .vote({songId: "fake_songId", voteType: VoteType.upVote, playlistType: PlaylistType.ownPlaylist}))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/vote/rejected')
    expect(actions[1].payload).toEqual("already_voted")
  })

  it('returns error action if there is database error', async () => {
    mockedFirestoreApi.vote.mockRejectedValueOnce('firestore error')
    await store.dispatch(playlistsAsyncActions
      .vote({songId: "fake_songId", voteType: VoteType.upVote, playlistType: PlaylistType.ownPlaylist}))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/vote/rejected')
  })
})

describe('FollowPlaylist slice async action', () => {
  beforeEach(() => {
      store.clearActions()
})
  it('returns the right action if the playlist is followed', async () => {
    mockedFirestoreApi.getPlaylistDetails.mockResolvedValueOnce({ownerName: "fake_player", playlistName:"Cool playlist"})
    mockedFirestoreApi.followPlaylist.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.followPlaylist("fake_playlistId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/followPlaylist/fulfilled')
  })
  it('returns error action if there is no such playlist', async () => {
    mockedFirestoreApi.getPlaylistDetails.mockResolvedValueOnce(undefined)
    await store.dispatch(playlistsAsyncActions.followPlaylist("fake_playlistId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/followPlaylist/rejected')
    expect(actions[1].payload).toEqual('no_such_playlist')
  })
  it('returns error action if the database is down', async () => {
    mockedFirestoreApi.getPlaylistDetails.mockRejectedValueOnce("database down")
    await store.dispatch(playlistsAsyncActions.followPlaylist("fake_playlistId"))
    
    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/followPlaylist/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })
})

describe('UnfollowPlaylist slice async action', () => {
  beforeEach(() => {
      store.clearActions()
})
  it('returns the right action if the playlist is unfollowed', async () => {
    mockedFirestoreApi.unfollowPlaylist.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.unfollowPlaylist("fake_playlistId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/unfollowPlaylist/fulfilled')
  })
  it('returns error action if the database is down', async () => {
    mockedFirestoreApi.unfollowPlaylist.mockRejectedValueOnce("database down")
    await store.dispatch(playlistsAsyncActions.unfollowPlaylist("fake_playlistId"))
    
    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/unfollowPlaylist/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })
})

describe('UpdatePartySong slice async action', () => {
  beforeEach(() => {
      store.clearActions()
})
  it('returns the right action if the partysong is updated', async () => {
    mockedFirestoreApi.updatePartySong.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.updatePartySong({playlistId: "fake_playlistId", 
    currentSong: {youtubeId: "fake_youtubeId", title: "fake_title"}}))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/updatePartySong/fulfilled')
  })
  it('returns error action if the database is down', async () => {
    mockedFirestoreApi.updatePartySong.mockRejectedValueOnce("database down")
    await store.dispatch(playlistsAsyncActions.updatePartySong({playlistId: "fake_playlistId", 
    currentSong: {youtubeId: "fake_youtubeId", title: "fake_title"}}))
    
    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/updatePartySong/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })
})

describe('EndParty slice async action', () => {
  beforeEach(() => {
      store.clearActions()
})
  it('returns the right action if the party is ended', async () => {
    mockedFirestoreApi.endParty.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.endParty("fake_playlistId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/endParty/fulfilled')
  })
  it('returns error action if the database is down', async () => {
    mockedFirestoreApi.endParty.mockRejectedValueOnce("database down")
    await store.dispatch(playlistsAsyncActions.endParty("fake_playlistId"))
    
    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/endParty/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })
})

describe('SubscribeToOwnPlaylists slice async action', () => {
  beforeEach(() => {
    store.clearActions()
  })
  it('returns the right action if subscribed to own playlists', async () => {
    mockedFirestoreApi.subscribeToOwnPlaylists.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.subscribeToOwnPlaylists("fake_userid"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/subscribeToOwnPlaylists/fulfilled')
    expect(actions[1].payload).toEqual('subscribed_to_own_playlists')
  })

  it('returns error action if database is down', async () => {
    mockedFirestoreApi.subscribeToOwnPlaylists.mockRejectedValueOnce("database error")
    await store.dispatch(playlistsAsyncActions.subscribeToOwnPlaylists("fake_userid"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/subscribeToOwnPlaylists/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })
})

describe('UnsubscribeFromOwnPlaylists slice async action', () => {
  beforeEach(() => {
    store.clearActions()
  })
  it('returns the right action if unsubscribed from own playlists', async () => {
    mockedFirestoreApi.unsubscribeFromOwnPlaylists.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.unsubscribeFromOwnPlaylists("fake_userid"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/unsubscribeFromOwnPlaylists/fulfilled')
    expect(actions[1].payload).toEqual('unsubscribed_from_own_playlists')
  })

  it('returns error action if database is down', async () => {
    mockedFirestoreApi.unsubscribeFromOwnPlaylists.mockRejectedValueOnce("database error")
    await store.dispatch(playlistsAsyncActions.unsubscribeFromOwnPlaylists("fake_userid"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/unsubscribeFromOwnPlaylists/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })
})

describe('SubscribeToOtherPlaylists slice async action', () => {
  beforeEach(() => {
    store.clearActions()
  })
  it('returns the right action if subscribed to other playlists', async () => {
    mockedFirestoreApi.subscribeToOtherPlaylists.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.subscribeToOtherPlaylists("fake_playlistId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/subscribeToOtherPlaylists/fulfilled')
    expect(actions[1].payload).toEqual('subscribed_to_other_playlists')
  })

  it('returns error action if database is down', async () => {
    mockedFirestoreApi.subscribeToOtherPlaylists.mockRejectedValueOnce("database error")
    await store.dispatch(playlistsAsyncActions.subscribeToOtherPlaylists("fake_playlistId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/subscribeToOtherPlaylists/rejected')
    expect(actions[1].payload).toEqual('database_error')
  })
})

describe('UnsubscribeFromOtherPlaylists slice async action', () => {
  beforeEach(() => {
    store.clearActions()
  })
  it('returns the right action if unsubscribed from other playlists', async () => {
    mockedFirestoreApi.unsubscribeFromOtherPlaylists.mockResolvedValueOnce()
    await store.dispatch(playlistsAsyncActions.unsubscribeFromOtherPlaylists("fake_playlistId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/unsubscribeFromOtherPlaylists/fulfilled')
    expect(actions[1].payload).toEqual('unsubscribed_from_other_playlists')
  })

  it('returns error action if database is down', async () => {
    mockedFirestoreApi.unsubscribeFromOtherPlaylists.mockRejectedValueOnce("database error")
    await store.dispatch(playlistsAsyncActions.unsubscribeFromOtherPlaylists("fake_playlistId"))

    const actions = store.getActions()
    expect(actions[1].type).toEqual('playlists/unsubscribeFromOtherPlaylists/rejected')
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


