import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Landing from '../../components/Landing'
import Sidebar from '../../components/Sidebar'
import { Container } from './styles'

export default function PrivateRoutes() {

  return (
    <Container>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </Container>
  )
}