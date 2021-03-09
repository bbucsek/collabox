import { combineReducers } from '@reduxjs/toolkit'
import authentication from './authentication/slice'
import playlists from './playlists/slice'
import notifications from './notification/slice'

export default combineReducers({ authentication, playlists, notifications })