import 'firebase/firestore'
import Song from '../types/Song'
import database from "./database"

let unsubscribeFromP: (id: string) => void | undefined;
let unsubscribeFromS: (id: string) => void | undefined;

const createPlaylist = async (owner: string, playlistName: string) => {
    const response = await database.collection('playlists').add({ owner, playlistName })
    return response.id
}

const getPlaylistDetails = async(playlistId: string) => {
    return await database
    .collection('playlists')
    .doc(playlistId)
    .get()
    .then((doc) => {
        return doc.data()

    })
}

const joinPlaylist = async (userId: string, ownerName: string, playlistId: string, playlistName: string) => {
    await database
    .collection('users')
    .doc(userId)
    .collection('otherPlaylists')
    .doc(playlistId)
    .set({ ownerName, playlistName })
}

const subscribeToPlaylist = async (id: string, observer: (playlist: any) => void) => {
    const callback = (snapshot: any) => {
        const playlistData = snapshot.data()
        const id = snapshot.id
        const playlist = { id, ...playlistData }
    
        observer(playlist)
    }
    unsubscribeFromP = await database
        .collection('playlists')
        .doc(id)
        .onSnapshot(callback)
}

const unsubscribeFromPlaylist = async (id: string) => {
    await unsubscribeFromP(id)
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

const getUserOtherPlayLists = async (userId: string) => {
    return database
    .collection('users')
    .doc(userId)
    .collection('otherPlaylists')
    .get()
    .then((querySnapshot) => {
        let data: any = []
        querySnapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()})
        })
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
    unsubscribeFromS = await database
        .collection('playlists')
        .doc(id)
        .collection('songs')
        .onSnapshot(callback)
}

const unsubscribeFromSongsCollection = async (id: string) => {
    await unsubscribeFromS(id)
}

const addSong = async (playlistId: string, song: Omit<Song, 'id'>) => {
    const response = await database.collection('playlists').doc(playlistId).collection('songs').add(song)
    return response.id
}

const checkIfSongExists = async (playlistId: string, youtubeId: string) => {
    const querySnapshot = await database
    .collection('playlists')
    .doc(playlistId)
    .collection('songs')
    .where('youtubeId', '==', youtubeId)
    .get()

    return !(querySnapshot.docs.length === 0)
}

export const firestoreApi = {
    createPlaylist,
    getPlaylistDetails, 
    joinPlaylist,
    subscribeToPlaylist,
    unsubscribeFromPlaylist,
    getUserOwnPlayLists,
    getUserOtherPlayLists,
    subscribeToSongsCollection,
    unsubscribeFromSongsCollection,
    addSong, 
    checkIfSongExists
}