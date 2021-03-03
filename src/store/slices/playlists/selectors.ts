import RootState from '../../RootState'

export const selectOwnPlaylists = (state: RootState) => state.playlists.ownPlaylists
export const selectOwnPlaylistIds = (state: RootState) => state.playlists.ownPlaylists?.map((playlist) => playlist.id)
export const selectOtherPlaylists = (state: RootState) => state.playlists.otherPlaylists
export const selectCurrentPlaylist = (state: RootState) => state.playlists.currentPlaylist
export const selectSongs = (state: RootState) => state.playlists.currentPlaylist?.songs
