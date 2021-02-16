import CurrentUserState from './types/AuthState'
import User from '../../../types/User'
import authenticationReducer, { authenticationActions } from './slice'

const state: CurrentUserState = {
  currentUser: null,
  errorMessage: null,
  loading: true,
}

const testUser: User = {
  name: 'Test User',
  email: 'testuser@gmail.com',
  id: 'uuid01234',
}

describe('Auth slice', () => {
  describe('set current user action', () => {
    it('sets current user state with the correct value', () => {
      const nextState = authenticationReducer(state, authenticationActions.SET_CURRENT_USER(testUser))

      expect(nextState.currentUser).toEqual(testUser)
    })

    it('sets loading false', () => {
      const nextState = authenticationReducer(state, authenticationActions.SET_CURRENT_USER(testUser))

      expect(nextState.loading).toBe(false)
    })
  })
})