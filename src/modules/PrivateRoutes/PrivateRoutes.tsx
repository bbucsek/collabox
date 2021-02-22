import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Landing from '../../components/Landing'
import PlaylistPage from '../../components/PlaylistPage'
import Sidebar from '../../components/Sidebar'
import { Container } from './styles'

export default function PrivateRoutes() {

  return (
    <Container>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/playlist/:id" component={PlaylistPage} />
      </Switch>
    </Container>
  )
}