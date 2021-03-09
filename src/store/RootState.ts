import AuthState from './slices/authentication/types/AuthState'
import NotificationState from './slices/notification/types/NotificationState'
import PlaylistsState from './slices/playlists/types/PlaylistsState'

type RootState = {
  authentication: AuthState,
  playlists: PlaylistsState,
  notifications: NotificationState
}

export default RootState