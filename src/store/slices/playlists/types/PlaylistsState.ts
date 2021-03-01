import PlaylistData from "../../../../types/PlaylistData"
import Playlist from '../../../../types/Playlist'

type PlaylistsState = {
  ownPlaylists: Pick<PlaylistData, 'id'| 'playlistName'>[] | null,
  otherPlaylists: PlaylistData[] | null, 
  currentPlaylist: Playlist | null,
  loading: {
    createPlaylistLoading: boolean,
    followPlaylistLoading: boolean,
    addSongLoading: boolean,
  }
  }
  
  export default PlaylistsState