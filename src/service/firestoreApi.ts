import 'firebase/firestore'
import Song from '../types/Song'
import database from "./database"

const createPlaylist = async (owner: string, playlistName: string) => {
    const response = await database.collection('playlists').add({ owner, playlistName })
    return response.id
}

const subscribeToPlaylist = async (id: string, observer: (playlist: any) => void) => {
    const callback = (snapshot: any) => {
        const playlistData = snapshot.data()
        const id = snapshot.id
        const playlist = { id, ...playlistData }
    
        observer(playlist)
    }
    await database.collection('playlists').doc(id).onSnapshot(callback)
}

const getUserOwnPlayLists = async (userId: string) => {
    return database
        .collection('playlists')
        .where('owner', '==', userId)
        .get()
        .then((querySnapshot) => {
            let data: any = []
            querySnapshot.forEach((doc) => {
                data = [...data, { id: doc.id, ...doc.data() }]
            });
            return data

        })
}

const subscribeToSongsCollection = async (id: string, observer: (playlist: any) => void) => {
    const callback = (snapshot: any) => {
        const songList = snapshot.docs.map((doc: any) => {
            const song = { ...doc.data(), id: doc.id }
            return song
        })
        observer(songList)
    }
    await database.collection('playlists').doc(id).collection('songs').onSnapshot(callback)
}

const addSong = async (playlistId: string, song: Omit<Song, 'id'>) => {
    const response = await database.collection('playlists').doc(playlistId).collection('songs').add(song)
    return response.id
}

export const firestoreApi = {
    createPlaylist, 
    subscribeToPlaylist,
    getUserOwnPlayLists,
    subscribeToSongsCollection,
    addSong
}