import firebase from 'firebase';
import 'firebase/firestore'
import PlaylistData from '../types/PlaylistData';
import Song from '../types/Song'
import database from "./database"

let unsubscribeFromP: (id: string) => void | undefined;
let unsubscribeFromS: (id: string) => void | undefined;
let unsubscribeFromOwnP: (id: string) => void | undefined;
let unsubscribeFromOtherP: (id: string) => void | undefined;

const createPlaylist = async (owner: string, ownerName: string, playlistName: string) => {
    const response = await database.collection('playlists').add({ owner, ownerName, playlistName })
    const playlistId = response.id
    await database
    .collection('users')
    .doc(owner)
    .collection('ownPlaylists')
    .doc(playlistId)
    .set({playlistName})
    
    return playlistId
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

const followPlaylist = async (userId: string, ownerName: string, playlistId: string, playlistName: string) => {
    await database
    .collection('users')
    .doc(userId)
    .collection('otherPlaylists')
    .doc(playlistId)
    .set({ ownerName, playlistName })
}

const unfollowPlaylist = async (userId: string, playlistId: string) => {
    await database
    .collection('users')
    .doc(userId)
    .collection('otherPlaylists')
    .doc(playlistId)
    .delete()
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

const subscribeToOwnPlaylists = async (userId: string, 
    observer: (playlists: Pick<PlaylistData, 'id'| 'playlistName'>[]) => void) => {
    const callback = (snapshot: any) => {
        const playlistsDocs = snapshot.docs
        let playlists : Pick<PlaylistData, 'id'| 'playlistName'>[] = []
       
        playlistsDocs.forEach((doc: any) => {
            playlists.push({id: doc.id, ...doc.data()})
        })
        observer(playlists)
    }

    unsubscribeFromOwnP = await database
    .collection('users')
    .doc(userId)
    .collection('ownPlaylists')
    .onSnapshot(callback) 
}

const unsubscribeFromOwnPlaylists = async (userId: string) => {
    await unsubscribeFromOwnP(userId)
}

const subscribeToOtherPlaylists = async (userId: string, observer: (playlists: any) => void) => {
    const callback = (snapshot: any) => {
        const playlistsDocs = snapshot.docs
        let playlists : PlaylistData[] = []
       
        playlistsDocs.forEach((doc: any) => {
            playlists.push({id: doc.id, ...doc.data()})
        })
        observer(playlists)
    }

    unsubscribeFromOtherP = await database
    .collection('users')
    .doc(userId)
    .collection('otherPlaylists')
    .onSnapshot(callback) 
}

const unsubscribeFromOtherPlaylists = async (userId: string) => {
    await unsubscribeFromOtherP(userId)
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
    const response = await database
    .collection('playlists')
    .doc(playlistId)
    .collection('songs')
    .add(song)
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

const updatePartySong = async (playlistId: string, youtubeId: string, title: string) => {
    const partySong = { partySong: {youtubeId, title, startTime:Date.now()}}
    await database
    .collection('playlists')
    .doc(playlistId)
    .set(partySong, {merge: true})
}

const endParty = async (playlistId: string) => {
    await database
    .collection('playlists')
    .doc(playlistId)
    .update({
        partySong: firebase.firestore.FieldValue.delete()
    })

}

export const firestoreApi = {
    createPlaylist,
    getPlaylistDetails, 
    followPlaylist,
    unfollowPlaylist,
    subscribeToPlaylist,
    unsubscribeFromPlaylist,
    subscribeToOwnPlaylists,
    unsubscribeFromOwnPlaylists,
    subscribeToOtherPlaylists,
    unsubscribeFromOtherPlaylists,
    subscribeToSongsCollection,
    unsubscribeFromSongsCollection,
    addSong, 
    checkIfSongExists, 
    updatePartySong,
    endParty
}