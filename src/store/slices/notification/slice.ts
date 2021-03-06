import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import SEVERITY from '../../../types/Severity'
import NotificationState from './types/NotificationState'

const initialState: NotificationState = {
    notifications: [],
}

let id: number = 0;

const getId = () => {
    id += 1
    return id;
}


const slice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        ADD_NOTIFICATION: (state, action: PayloadAction< {message: string, severity: SEVERITY}>) => {
            console.log("boo")
            const id = getId()
            const newState: any = [...state.notifications, {...action.payload, id}]
            state.notifications = newState
        },
        DELETE_NOTIFICATION: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter((notification: any ) => notification.id !== action.payload)
        },
    },
})

export default slice.reducer

export const notificationActions = slice.actions
