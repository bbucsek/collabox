import SEVERITY from '../../../types/Severity'
import { playlistsAsyncActions } from '../playlists/slice'
import notificationReducer, {notificationActions} from './slice'
import NotificationState from './types/NotificationState'

const state: NotificationState = {
    notifications: [],
}

const stateWithNotification: NotificationState = {
    notifications: [{
        id: 1,
        message: "playlist_created", 
        severity: SEVERITY.Info
    }]
}

describe('Notification slice', () => {
    it('sets the state correctly if createPlaylist playlists action is fulfilled', () => {
        const nextState = notificationReducer(state, 
            { type: playlistsAsyncActions.createPlaylist.fulfilled, payload: 'playlist_created' })

        expect(nextState.notifications[0].message).toEqual('playlist_created')
        expect(nextState.notifications[0].severity).toEqual('info')
    }),
    it('sets the state correctly if createPlaylist playlists action is rejected', () => {
        const nextState = notificationReducer(state, 
            { type: playlistsAsyncActions.createPlaylist.rejected, payload: 'database_error'})

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if verifyUrl playlists action is rejected because url is not youtube url', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.verifyUrl.rejected, payload: 'no_youtube_url'} )

        expect(nextState.notifications[0].message).toEqual('no_youtube_url')
        expect(nextState.notifications[0].severity).toEqual('warning')
    }),
    it('sets the state correctly if verifyUrl playlists action is rejected because video is too long', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.verifyUrl.rejected, payload: 'video_too_long'} )

        expect(nextState.notifications[0].message).toEqual('video_too_long')
        expect(nextState.notifications[0].severity).toEqual('warning')
    }),
    it('sets the state correctly if addSong playlists action is rejected', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.addSong.rejected, payload: 'database_error'})

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if checkIfSongExists playlists action is rejected because song is duplicate', () => {
        const nextState = notificationReducer(state, 
            { type: playlistsAsyncActions.checkIfSongExists.rejected, payload:'duplicate_song' })

        expect(nextState.notifications[0].message).toEqual('duplicate_song')
        expect(nextState.notifications[0].severity).toEqual('warning')
    }),
    it('sets the state correctly if checkIfSongExists playlists action is rejected becasue database is down', () => {
        const nextState = notificationReducer(state, 
            { type: playlistsAsyncActions.checkIfSongExists.rejected, payload:'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
        it('sets the state correctly if followPlaylist playlists action is fulfilled', () => {
        const nextState = notificationReducer(state, 
            { type: playlistsAsyncActions.followPlaylist.fulfilled, payload: 'playlist_followed'})

        expect(nextState.notifications[0].message).toEqual('playlist_followed')
        expect(nextState.notifications[0].severity).toEqual('info')
    }),
    it('sets the state correctly if followPlaylist playlists action is rejected becasue the playlist does not exist', () => {
        const nextState = notificationReducer(state, 
            { type: playlistsAsyncActions.followPlaylist.rejected, payload:'no_such_playlist'} )

        expect(nextState.notifications[0].message).toEqual('no_such_playlist')
        expect(nextState.notifications[0].severity).toEqual('warning')
    }),
    it('sets the state correctly if followPlaylist playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            { type: playlistsAsyncActions.followPlaylist.rejected, payload:'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if unfollowPlaylist playlists action is fulfilled', () => {
        const nextState = notificationReducer(state, 
            { type: playlistsAsyncActions.unfollowPlaylist.fulfilled, payload: 'playlist_followed'})

        expect(nextState.notifications[0].message).toEqual('playlist_followed')
        expect(nextState.notifications[0].severity).toEqual('info')
    }),
    it('sets the state correctly if unfollowPlaylist playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.unfollowPlaylist.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if updatePartySong playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.updatePartySong.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if endParty playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.endParty.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if subscribeToOwnPlaylists playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.subscribeToOwnPlaylists.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if unsubscribeFromOwnPlaylists playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.unsubscribeFromOwnPlaylists.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if subscribeToOtherPlaylists playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.subscribeToOtherPlaylists.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if unsubscribeFromOtherPlaylists playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.unsubscribeFromOtherPlaylists.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if subscribeToPlaylist playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.subscribeToPlaylist.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if unsubscribeFromPlaylist playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.unsubscribeFromPlaylist.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if subscribeToSongsCollection playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.subscribeToSongsCollection.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('sets the state correctly if unsubscribeFromSongsCollection playlists action is rejected becasue the database is down', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.unsubscribeFromSongsCollection.rejected, payload: 'database_error'} )

        expect(nextState.notifications[0].message).toEqual('database_error')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),
    it('returns the right notification when newtitle is empty string', () => {
        const nextState = notificationReducer(state, 
            {type: playlistsAsyncActions.changePlaylistTitle.rejected, payload: 'title_not_good'} )

        expect(nextState.notifications[0].message).toEqual('title_not_good')
        expect(nextState.notifications[0].severity).toEqual('error')
    }),

  describe('DELETE_NOTIFICATION action', () => {
    it('sets the state with the correct value', () => {
        const nextState = notificationReducer(stateWithNotification, 
        notificationActions.DELETE_NOTIFICATION(1))

        expect(nextState).toEqual({notifications: []})
    })
})
})