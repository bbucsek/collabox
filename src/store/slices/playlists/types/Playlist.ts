import User from "../../../../types/User"
import Song from "./Song"

type Playlist = {
    id: string,
    playlistName: string,
    owner: string,
    users: User[] | null,
    songs: Song[] | null,
}

export default Playlist