import Song from "./Song"
import User from "./User"

type Playlist = {
    id: string,
    playlistName: string,
    owner: string,
    partySong: null | {
        youtubeId: string,
        title: string,
        startTime: string
    }
    users: User[] | null,
    songs: Song[] | null,
}

export default Playlist