import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentUser,
  selectAuthLoading,
} from './store/slices/authentication/selectors'
import { authenticationAsyncActions } from './store/slices/authentication/slice'
import Login from './components/Login'
import PrivateRoutes from './modules/PrivateRoutes/PrivateRoutes';
import Loading from './components/Loading';

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const loading = useSelector(selectAuthLoading)

  useEffect(() => {
    dispatch(authenticationAsyncActions.subscribeToAuthChanges())
  }, [dispatch])

  if (loading) {
    return <Loading />
  }

  if (currentUser) {
    return <PrivateRoutes />
  }

  return <Login />
}

export default App;