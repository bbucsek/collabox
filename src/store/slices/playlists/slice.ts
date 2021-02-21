import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import getYoutubeId from 'get-youtube-id'
import PlaylistsState from './types/PlaylistsState'
import { firestoreApi } from '../../../service/firestoreApi'
import { checkIfVideoDurationIsOk, getVideoDetails } from '../../../utils/getVideoDetails'
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
            const id = await firestoreApi.createPlaylist(currentUser!.id, playlistName)
            if (id) {
                thunkApi.dispatch(subscribeToPlaylist(id))
                thunkApi.dispatch(subscribeToSongsCollection(id))
            }
            return 'playlist_created'
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
            const state = thunkApi.getState()

            const url = payload
            const youtubeId = getYoutubeId(url)
            if (!youtubeId) {
                return "not_valid_youtube_url"
            }
            const videoDetails = await getVideoDetails(youtubeId)

            const videoDurationIsOk = checkIfVideoDurationIsOk(videoDetails.duration)

            if (!videoDurationIsOk) {
                return "video_too_long"
            }

            thunkApi.dispatch(addSong({youtubeId, title: videoDetails.title}))

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
                return "no_currentUser"
            }
            const userId = currentUser.id
            
            const { playlists } = state
            const { currentPlaylist } = playlists
            if (!currentPlaylist) {
                return "no_currentPlaylist"
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
                return 'playlist_created'
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
        const id = payload;
        try {
            const currentUserOwnPlaylists = await firestoreApi.getUserOwnPlayLists(id)
            thunkApi.dispatch(slice.actions.SET_OWN_PLAYLISTS(currentUserOwnPlaylists))
            return 'sets_own_playlists'
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


export default slice.reducer

export const playlistsActions = slice.actions

export const playlistsAsyncActions = { 
    subscribeToPlaylist, 
    subscribeToSongsCollection,
    createPlaylist, 
    getCurrentUserPlaylists,
    verifyUrl,
    addSong
}
