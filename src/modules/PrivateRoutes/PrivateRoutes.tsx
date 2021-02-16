import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Landing from '../../components/Landing'

export default function PrivateRoutes() {
  const location = useLocation()

  return (
    <Switch location={location} key={location.key}>
      <Route exact path="/" component={Landing} />
    </Switch>
  )
}