import User from '../../../../types/User'

type AuthState = {
  currentUser: User | null
  errorMessage: string | null
  loading: boolean
}

export default AuthState