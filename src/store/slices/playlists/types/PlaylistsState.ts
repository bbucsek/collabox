import Playlist from "./Playlist"

type PlaylistsState = {
  ownPlaylists: string[] | null,
  otherPlaylists: string[] | null, 
  CurrentPlaylist: Playlist | null,
  loading: {
    createPlaylistLoading: boolean,
  }
  }
  
  export default PlaylistsState