import PlaylistData from "../../../../types/PlaylistData"
import Playlist from '../../../../types/Playlist'

type PlaylistsState = {
  ownPlaylists: PlaylistData[] | null,
  otherPlaylists: string[] | null, 
  currentPlaylist: Playlist | null,
  loading: {
    createPlaylistLoading: boolean,
    getPlaylists: boolean,
  }
  }
  
  export default PlaylistsState