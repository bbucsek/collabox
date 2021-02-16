import firebase from 'firebase/app'
import { auth, provider } from './database'

export const signIn = () => {
  return auth.signInWithPopup(provider)
}

export const signOut = () => {
  return firebase.auth().signOut()
}

export const subscriber = (observer: any) => {
  firebase.auth().onAuthStateChanged(observer)
}