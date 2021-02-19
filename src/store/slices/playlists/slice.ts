import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import PlaylistsState from './types/PlaylistsState'
import { firestoreApi } from '../../../service/firestoreApi'
import RootState from '../../RootState'
import Playlist from './types/Playlist'

const initialState: PlaylistsState = {
    ownPlaylists: null,
    otherPlaylists: null,
    CurrentPlaylist: null,
    loading: {
        createPlaylistLoading: false,
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
            }
            return 'playlist_created'
        } catch (error) {
            return thunkApi.rejectWithValue('database_error')
        }
})

const slice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {
        SET_PLAYLIST: (state, action: PayloadAction<Playlist>) => {
            state.CurrentPlaylist = action.payload
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

export default slice.reducer

export const playlistsActions = slice.actions

export const playlistsAsyncActions = { subscribeToPlaylist, createPlaylist }