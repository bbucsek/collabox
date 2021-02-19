import AuthState from './slices/authentication/types/AuthState'
import PlaylistsState from './slices/playlists/types/PlaylistsState'

type RootState = {
  authentication: AuthState,
  playlists: PlaylistsState,
}

export default RootState