import 'firebase/firestore'
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

export const firestoreApi = {
    createPlaylist, 
    subscribeToPlaylist,
    getUserOwnPlayLists,
}