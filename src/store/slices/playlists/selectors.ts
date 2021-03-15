import VoteType from '../../../types/VoteType'
import RootState from '../../RootState'

export const selectOwnPlaylists = (state: RootState) => state.playlists.ownPlaylists
export const selectOwnPlaylistIds = (state: RootState) => state.playlists.ownPlaylists?.map((playlist) => playlist.id)
export const selectOtherPlaylists = (state: RootState) => state.playlists.otherPlaylists
export const selectCurrentPlaylist = (state: RootState) => state.playlists.currentPlaylist
export const selectCurrentPlaylistOwnerId = (state:RootState) => state.playlists.currentPlaylist?.owner
export const selectCurrentPlaylistOwnerName = (state:RootState) => state.playlists.currentPlaylist?.ownerName
export const selectCurrentPlaylistName = (state:RootState) => state.playlists.currentPlaylist?.playlistName
export const selectCurrentPlaylistId = (state:RootState) => state.playlists.currentPlaylist?.id
export const selectCurrentPlaylistPartyOngoing = (state:RootState) => {
    if (state.playlists.currentPlaylist && state.playlists.currentPlaylist.partySong) {
        return true
    }
    return false
}
export const selectCurrentPlaylistSongsExist = (state:RootState) => {
    if (state.playlists.currentPlaylist && state.playlists.currentPlaylist.songs) {
        return true
    }
    return false
}
export const selectSongs = (state: RootState) => {
    const songsWithoutVoteInfo = state.playlists.currentPlaylist?.songs
    const userIsPlaylistOwner = state.playlists.currentPlaylist?.owner === state.authentication.currentUser?.id
    let voteInfo: {[k: string]: number} = {}
    if (userIsPlaylistOwner) {
        const playlistInfo = state.playlists.ownPlaylists?.filter((playlist) => playlist.id ===  state.playlists.currentPlaylist?.id)[0] as any
        voteInfo = playlistInfo?.votes
    } else {
        const playlistInfo = state.playlists.otherPlaylists?.filter((playlist) => playlist.id ===  state.playlists.currentPlaylist?.id)[0] as any
        voteInfo = playlistInfo?.votes
    }
    if (!voteInfo) {
        return songsWithoutVoteInfo
    }
    let songs = songsWithoutVoteInfo?.map((song) => {
        if (voteInfo[song.id] === VoteType.upVote){
            return {...song, upVoted: true}
        } else if(voteInfo[song.id] === VoteType.downVote) {
            return {...song, downVoted: true}
        }   
        return song
    })
    return songs}
