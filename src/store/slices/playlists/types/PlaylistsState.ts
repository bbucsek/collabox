import PlaylistData from "../../../../types/PlayListData"
import Playlist from "./Playlist"

type PlaylistsState = {
  ownPlaylists: PlaylistData[] | null,
  otherPlaylists: string[] | null, 
  currentPlaylist: Playlist | null,
  loading: {
    createPlaylistLoading: boolean,
  }
  }
  
  export default PlaylistsState