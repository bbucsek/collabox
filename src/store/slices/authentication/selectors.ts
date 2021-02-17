import RootState from '../../RootState'

export const selectCurrentUser = (state: RootState) => state.authentication.currentUser

export const selectAuthLoading = (state: RootState) => state.authentication.loading