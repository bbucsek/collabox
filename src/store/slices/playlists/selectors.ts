import RootState from '../../RootState'

export const selectOwnPlaylists = (state: RootState) => state.playlists.ownPlaylists
export const selectCurrentPlaylist = (state: RootState) => state.playlists.currentPlaylist
export const selectSongs = (state: RootState) => state.playlists.currentPlaylist?.songs