import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { selectCurrentUser, selectAuthLoading } from './store/slices/authentication/selectors'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

jest.mock('./store/slices/authentication/selectors', () => ({
  selectCurrentUser: jest.fn(),
  selectAuthLoading: jest.fn(),
}))


describe('App component', () => {
  it('renders without crashing', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )
  })
})
