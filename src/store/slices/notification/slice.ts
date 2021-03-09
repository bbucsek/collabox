import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { playlistsAsyncActions } from '../playlists/slice';
import SEVERITY from '../../../types/Severity'
import NotificationState from './types/NotificationState'

const initialState: NotificationState = {
    notifications: [],
}

let id: number = 0;

const getId = () => {
    id += 1
    return id;
}


const slice = createSlice({
    name: 'notification',
    initialState,
    extraReducers: {
        [playlistsAsyncActions.createPlaylist.fulfilled.type]: (state) => {
            state.notifications.push({
            id: getId(),
            message: 'playlist_created',
            severity: SEVERITY.Info,
            })
        },
        [playlistsAsyncActions.createPlaylist.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.verifyUrl.rejected.type]: (state, action) => {
        state.notifications.push({
        id: getId(),
        message: action.payload,
        severity: SEVERITY.Warning,
        })
        },
        [playlistsAsyncActions.addSong.fulfilled.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Info,
            })
        },
        [playlistsAsyncActions.addSong.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
        })
        },
        [playlistsAsyncActions.checkIfSongExists.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity:  action.payload === 'database_error'? SEVERITY.Error : SEVERITY.Warning,
            })
        },
        [playlistsAsyncActions.followPlaylist.fulfilled.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity:  SEVERITY.Info,
            })
        },
        [playlistsAsyncActions.followPlaylist.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity:  action.payload === 'database_error'? SEVERITY.Error : SEVERITY.Warning,
            })
        },
        [playlistsAsyncActions.unfollowPlaylist.fulfilled.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Info,
            })
        },
        [playlistsAsyncActions.unfollowPlaylist.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.updatePartySong.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.endParty.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.subscribeToOwnPlaylists.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.unsubscribeFromOwnPlaylists.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.subscribeToOtherPlaylists.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.unsubscribeFromOtherPlaylists.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.subscribeToPlaylist.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.unsubscribeFromPlaylist.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.subscribeToSongsCollection.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
        [playlistsAsyncActions.unsubscribeFromSongsCollection.rejected.type]: (state, action) => {
            state.notifications.push({
            id: getId(),
            message: action.payload,
            severity: SEVERITY.Error,
            })
        },
},
    reducers: {
        DELETE_NOTIFICATION: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter((notification: any ) => notification.id !== action.payload)
        },
    },
})

export default slice.reducer

export const notificationActions = slice.actions
