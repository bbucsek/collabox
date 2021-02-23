import Song from "./Song"
import User from "./User"

type Playlist = {
    id: string,
    playlistName: string,
    owner: string,
    users: User[] | null,
    songs: Song[] | null,
}

export default Playlist