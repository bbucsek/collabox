import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import firebase from 'firebase/app'
import User from '../../../types/User'
import AuthState from './types/AuthState'
import { subscribeToAuthentication } from '../../../service/authentication'

const initialState: AuthState = {
    currentUser: null,
    errorMessage: null,
    loading: true,
}

const subscribeToAuthChanges = createAsyncThunk(
    'authentication/subscribeToAuthChanges',
    async (payload, thunkApi) => {
        const observer = (user: firebase.User) => {
            if (user) {
                const newUserState: User = {
                    name: user.displayName || 'anonymous',
                    email: user.email || 'no_email',
                    id: user.uid,
                }
                thunkApi.dispatch(slice.actions.SET_CURRENT_USER(newUserState)) 
            } else {
                thunkApi.dispatch(slice.actions.SET_CURRENT_USER(null))
            }
        }
        try {
            await subscribeToAuthentication(observer)
        } catch (error) {
            thunkApi.rejectWithValue('authentication_error')
        }
    }
)

const slice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        SET_CURRENT_USER: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload
            state.loading = false
        },
    },
})

export default slice.reducer

export const authenticationActions = slice.actions

export const authenticationAsyncActions = { subscribeToAuthChanges }