import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import getYoutubeId from 'get-youtube-id'
import PlaylistsState from './types/PlaylistsState'
import { firestoreApi } from '../../../service/firestoreApi'
import checkIfVideoDurationIsOk  from '../../../utils/checkIfVideoDurationIsOk'
import getVideoDetails from '../../../utils/youtubeApi'
import RootState from '../../RootState'
import Playlist from '../../../types/Playlist'
import PlaylistData from '../../../types/PlaylistData'
import Song from '../../../types/Song'

const initialState: PlaylistsState = {
    ownPlaylists: null,
    otherPlaylists: null,
    currentPlaylist: null,
    loading: {
        createPlaylistLoading: false,
        getPlaylists: false,
        addSongLoading: false,
    }
}

const createPlaylist = createAsyncThunk<
string,
string,
{ state: RootState }
>
('playlists/createPlaylist',
    async (payload: string, thunkApi) => {
        const state = thunkApi.getState()
        const { authentication } = state
        const {currentUser} = authentication
        const playlistName = payload
        try {
            const id = await firestoreApi.createPlaylist(currentUser!.id, currentUser!.name, playlistName)
            if (id) {
                thunkApi.dispatch(getCurrentUserPlaylists(currentUser!.id))
                thunkApi.dispatch(subscribeToPlaylist(id))
                thunkApi.dispatch(subscribeToSongsCollection(id))
            }
            return id
        } catch (error) {
            return thunkApi.rejectWithValue('database_error')
        }
    })

const verifyUrl = createAsyncThunk<
    string,
    string,
    { state: RootState }
    >
    ('playlists/verifyUrl',
        async (payload: string, thunkApi) => {
            const url = payload
            const youtubeId = getYoutubeId(url)
            if (!youtubeId) {
                return thunkApi.rejectWithValue("no_youtube_url")
            }
            const videoDetails = await getVideoDetails(youtubeId)
            const videoDurationIsOk = checkIfVideoDurationIsOk(videoDetails.duration)
            if (!videoDurationIsOk) {
                return thunkApi.rejectWithValue("video_too_long")
            }
            thunkApi.dispatch(checkIfSongExists({youtubeId, title: videoDetails.title}))
            return "url_verified"
    })

const addSong = createAsyncThunk<
    string,
    {youtubeId: string, title: string},
    { state: RootState }
    >
    ('playlists/addSong',
        async (payload, thunkApi) => {
            const state = thunkApi.getState()
            const { authentication } = state
            const { currentUser } = authentication
            if (!currentUser) {
                return thunkApi.rejectWithValue("no_currentUser")
            }
            const userId = currentUser.id
            
            const { playlists } = state
            const { currentPlaylist } = playlists
            if (!currentPlaylist) {
                return thunkApi.rejectWithValue("no_currentPlaylist")
            }
            const playlistId = currentPlaylist.id
            const { youtubeId, title } = payload
            const song: Omit<Song, 'id'> = {
                youtubeId,
                title,
                votes: 0,
                userId
            }
            try {
                await firestoreApi.addSong(playlistId, song)
                return 'song_added'
            } catch (error) {
                return thunkApi.rejectWithValue('database_error')
            }
    })

const checkIfSongExists  = createAsyncThunk<
string,
{youtubeId: string, title: string},
{ state: RootState }
>
('playlists/checkIfSongExists',
    async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { playlists } = state
        const { currentPlaylist } = playlists
        if (!currentPlaylist) {
            return thunkApi.rejectWithValue("no_currentPlaylist")
        }
        const playlistId = currentPlaylist.id
        const { youtubeId, title } = payload
        try{
            const songExists = await firestoreApi.checkIfSongExists(playlistId, youtubeId)
            if (songExists) {
                return 'duplicate_song'
            }
            thunkApi.dispatch(addSong({youtubeId, title}))
            return 'not_duplicate_song'

        } catch (error) {
            return thunkApi.rejectWithValue('database_error')
        }   
})

const getCurrentUserPlaylists = createAsyncThunk<
    string,
    string,
    { state: RootState } >
    ('playlists/getCurrentUserPlaylists',
    async (payload, thunkApi) => {
        const userId = payload;
        try {
            const currentUserOwnPlaylists = await firestoreApi.getUserOwnPlayLists(userId)
            thunkApi.dispatch(slice.actions.SET_OWN_PLAYLISTS(currentUserOwnPlaylists))
            return 'sets_own_playlists'
        } catch (error) {
            return thunkApi.rejectWithValue('database_error')
        }
})

const joinPlaylist = createAsyncThunk<
string,
string,
{ state: RootState }
>
('playlists/joinPlaylist',
    async (payload: string, thunkApi) => {
        const state = thunkApi.getState()
        const { authentication } = state
        const {currentUser} = authentication
        const playlistId = payload
        try {
            const playlistDetails: any = await firestoreApi.getPlaylistDetails(playlistId)
            const {ownerName, playlistName } = playlistDetails
            await firestoreApi.joinPlaylist(currentUser!.id, ownerName, playlistId, playlistName)
            thunkApi.dispatch(getCurrentUserOtherPlaylists(currentUser!.id))
            thunkApi.dispatch(subscribeToPlaylist(playlistId))
            thunkApi.dispatch(subscribeToSongsCollection(playlistId))
            return 'playlist_joined'
        } catch (error) {
            return thunkApi.rejectWithValue('database_error')
        }
    })

const getCurrentUserOtherPlaylists = createAsyncThunk<
    string,
    string,
    { state: RootState } >
    ('playlists/getCurrentUserOtherPlaylists',
    async (payload, thunkApi) => {
        const id = payload;
        try {
            const currentUserOtherPlaylists = await firestoreApi.getUserOtherPlayLists(id)
            thunkApi.dispatch(slice.actions.SET_OTHER_PLAYLISTS(currentUserOtherPlaylists))
            return 'other_playlists_set'
        } catch (error) {
            return thunkApi.rejectWithValue('database_error')
        }
})

const slice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        SET_PLAYLIST: (state, action: PayloadAction<Playlist>) => {
            state.currentPlaylist = action.payload
        },
        SET_OWN_PLAYLISTS: (state, action: PayloadAction<PlaylistData[]>) => {
            state.ownPlaylists = action.payload
        },
        SET_OTHER_PLAYLISTS: (state, action: PayloadAction<PlaylistData[]>) => {
            state.otherPlaylists = action.payload
        },
        SET_SONGS: (state, action: PayloadAction<Song[]>) => {
            state.currentPlaylist!.songs = action.payload
        },
    },
    extraReducers: {
        [createPlaylist.pending.type]: (state) => {
            state.loading.createPlaylistLoading = true
        },
        [createPlaylist.fulfilled.type]: (state) => {
            state.loading.createPlaylistLoading = false
        },
        [createPlaylist.rejected.type]: (state) => {
            state.loading.createPlaylistLoading = false
        },
        [getCurrentUserPlaylists.rejected.type]: (state) => {
            state.loading.getPlaylists = false
        },
        [getCurrentUserPlaylists.fulfilled.type]: (state) => {
            state.loading.getPlaylists = false
        },
        [getCurrentUserPlaylists.pending.type]: (state) => {
            state.loading.getPlaylists = true
        },
        [addSong.pending.type]: (state) => {
            state.loading.addSongLoading = true
        },
        [addSong.fulfilled.type]: (state) => {
            state.loading.addSongLoading = false
        },
        [addSong.rejected.type]: (state) => {
            state.loading.addSongLoading = false
        }
    }
})

const subscribeToPlaylist = createAsyncThunk<
    string,
    string,
    { state: RootState } >(
    'playlists/subscribeToPlaylist',
        async (payload, thunkApi) => {
        const id = payload;
        
        const observer = (playlist: Playlist) => {
            thunkApi.dispatch(slice.actions.SET_PLAYLIST(playlist)) 
        }
        try {
            await firestoreApi.subscribeToPlaylist(id, observer)
            return 'subscribed_to_playlist'
        } catch (error) {
            return thunkApi.rejectWithValue('database_error')
        }
    }
)

const unsubscribeFromPlaylist = createAsyncThunk<
    string,
    string,
    { state: RootState } >(
    'playlists/unsubscribeFromPlaylist',
        async (payload, thunkApi) => {
        const id = payload;
        
        try {
            await firestoreApi.unsubscribeFromPlaylist(id)
            return 'unsubscribed_from_playlist'
        } catch (error) {
            return thunkApi.rejectWithValue('database_error')
        }
    }
)

const subscribeToSongsCollection = createAsyncThunk<
    string,
    string,
    { state: RootState } >(
    'playlists/subscribeToSongsCollection',
        async (payload, thunkApi) => {
        const id = payload;
        
        try {
            const observer = (songs: Song[]) => {
                thunkApi.dispatch(slice.actions.SET_SONGS(songs)) 
            }
            await firestoreApi.subscribeToSongsCollection(id, observer)
            return 'subscribed_to_songscollection'
        } catch (error) {
            return thunkApi.rejectWithValue('database_error')
        }
    }
)


const unsubscribeFromSongsCollection = createAsyncThunk<
    string,
    string,
    { state: RootState } >(
    'playlists/unsubscribeFromSongsCollection',
        async (payload, thunkApi) => {
        const id = payload;
        
        try {
            await firestoreApi.unsubscribeFromSongsCollection(id)
            return 'unsubscribed_from_songscollection'
        } catch (error) {
            return thunkApi.rejectWithValue('database_error')
        }
    }
)

export default slice.reducer

export const playlistsActions = slice.actions

export const playlistsAsyncActions = { 
    subscribeToPlaylist, 
    unsubscribeFromPlaylist,
    subscribeToSongsCollection,
    unsubscribeFromSongsCollection,
    createPlaylist, 
    getCurrentUserPlaylists,
    getCurrentUserOtherPlaylists,
    verifyUrl,
    addSong, 
    checkIfSongExists,
    joinPlaylist
}
