import SEVERITY from '../../../types/Severity'
import notificationReducer, {notificationActions} from './slice'
import NotificationState from './types/NotificationState'

const state: NotificationState = {
    notifications: [],
}

const stateWithNotification: NotificationState = {
    notifications: [{
        id: 1,
        message: "playlist_created", 
        severity: SEVERITY.Info
    }]
}

describe('Notification slice', () => {
  describe('ADD_NOTIFICATION action', () => {
    it('sets the state with the correct value', () => {
        const expectedState = {
            notifications: [{
                id: 1,
                message: "playlist_created", 
                severity: SEVERITY.Info
            }],
        }
        const nextState = notificationReducer(state, 
        notificationActions.ADD_NOTIFICATION({message: "playlist_created", severity: SEVERITY.Info}))

        expect(nextState).toEqual(expectedState)
    })
  })
  describe('DELETE_NOTIFICATION action', () => {
    it('sets the state with the correct value', () => {
        const nextState = notificationReducer(stateWithNotification, 
        notificationActions.DELETE_NOTIFICATION(1))

        expect(nextState).toEqual({notifications: []})
    })
})
})