import { combineReducers } from '@reduxjs/toolkit'
import authentication from './authentication/slice'
import playlists from './playlists/slice'

export default combineReducers({ authentication, playlists })