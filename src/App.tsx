import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentUser,
  selectAuthLoading,
} from './store/slices/authentication/selectors'
import { authenticationAsyncActions } from './store/slices/authentication/slice'
import Login from './components/Login'
import PrivateRoutes from './modules/PrivateRoutes/PrivateRoutes';

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const loading = useSelector(selectAuthLoading)

  useEffect(() => {
    dispatch(authenticationAsyncActions.subscribeToAuthChanges())
  }, [dispatch])

  if (loading) {
    return (
      <div>
        loading....
      </div>
    )
  }

  if (currentUser) {
    return <PrivateRoutes />
  }
  
  return <Login />
}

export default App;