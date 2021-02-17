import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Landing from '../../components/Landing'

export default function PrivateRoutes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  )
}