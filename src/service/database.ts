import firebase from 'firebase'
import config from '../../config'

const firebaseApp = firebase.initializeApp(config.firebase)

const database = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }

export default database