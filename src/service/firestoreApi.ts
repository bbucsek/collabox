import firebase from 'firebase';
import 'firebase/firestore'
import PlaylistData from '../types/PlaylistData';
import PlaylistType from '../types/PlaylistType';
import Song from '../types/Song'
import VoteType from '../types/VoteType';
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

const deletePlaylist = async (currentUserId: string, playlistId: string, followers: string[]) => {
    await database
    .collection('playlists')
    .doc(playlistId)
    .delete()

    await database
    .collection('users')
    .doc(currentUserId)
    .collection('ownPlaylists')
    .doc(playlistId)
    .delete()

    await followers.forEach(async (followerId) => {
        await database
        .collection('users')
        .doc(followerId)
        .collection('otherPlaylists')
        .doc(playlistId)
        .delete()
    });
}

const followPlaylist = async (userId: string, ownerName: string, playlistId: string, playlistName: string) => {
    await database
    .collection('users')
    .doc(userId)
    .collection('otherPlaylists')
    .doc(playlistId)
    .set({ ownerName, playlistName })

    await database
    .collection('playlists')
    .doc(playlistId)
    .update({followers: firebase.firestore.FieldValue.arrayUnion(userId)})
}

const unfollowPlaylist = async (userId: string, playlistId: string) => {
    await database
    .collection('users')
    .doc(userId)
    .collection('otherPlaylists')
    .doc(playlistId)
    .delete()

    await database
    .collection('playlists')
    .doc(playlistId)
    .update({followers: firebase.firestore.FieldValue.arrayRemove(userId)})
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

const addSong = async (playlistId: string, song: Omit<Song, 'id' | 'downVoted' | 'upVoted'>) => {
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

const deleteSong = async (playlistId: string, songId: string) => {
    await database
    .collection('playlists')
    .doc(playlistId)
    .collection('songs')
    .doc(songId)
    .delete() 
}

const checkVoteStatus = async (userId: string, playlistId: string, songId: string, playlistType: PlaylistType) => {
    return await database
    .collection('users')
    .doc(userId)
    .collection(playlistType)
    .doc(playlistId)
    .get()
    .then((doc) => {
        const playlist: any = doc.data()
        const  { votes } = playlist
        if (!votes || !votes[songId]) {
            return 0
        }
        return votes[songId]
    })
}

const vote = async (userId: string, playlistId: string, songId: string, voteChange: number, voteType: VoteType, playlistType: PlaylistType) => {
    await database
    .collection('users')
    .doc(userId)
    .collection(playlistType)
    .doc(playlistId)
    .update({[`votes.${songId}`]: voteType})

    await database
    .collection('playlists')
    .doc(playlistId)
    .collection('songs')
    .doc(songId)
    .update({votes: firebase.firestore.FieldValue.increment(voteChange)})
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
    deletePlaylist,
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
    deleteSong,
    checkVoteStatus,
    vote,
    updatePartySong,
    endParty
}