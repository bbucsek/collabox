import Playlist from "./Playlist"

type PlaylistsState = {
  ownPlaylists: string[] | null,
  otherPlaylists: string[] | null,
  CachedPlaylistData: Playlist[] | null,  
  CurrentPlaylist: Playlist | null,
  loading: {
    createPlaylistLoading: boolean,
  }
  }
  
  export default PlaylistsState