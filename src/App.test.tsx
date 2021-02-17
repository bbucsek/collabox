import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { selectCurrentUser, selectAuthLoading } from './store/slices/authentication/selectors'
import Login from './components/Login';
import Loading from './components/Loading';
import User from './types/User';
import Landing from './components/Landing'

const initialMockState = {
  currentUser: {},
}

const state = initialMockState
const mockStore = configureMockStore([thunk])
const store = mockStore(() => state)

jest.mock('./store/slices/authentication/selectors', () => ({
  selectCurrentUser: jest.fn(),
  selectAuthLoading: jest.fn(),
}))

jest.mock('./components/Login')
jest.mock('./components/Loading')
jest.mock('./components/Landing')

describe('App component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    Login.mockImplementation(() => <div>LoginMock</div>)
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )
  })

  
  it('renders Login component when loading state is false and currentUser is null', () => {
    selectAuthLoading.mockImplementation(() => false)
    selectCurrentUser.mockImplementation(() => null)
    Login.mockImplementation(() => <div>LoginMock</div>)

    const { queryByText } = render(
      <Provider store={store}>
          <App />
      </Provider>
    )

    const loginMock = queryByText('LoginMock')

    expect(loginMock).toBeInTheDocument()
  })

  it('renders Loading component when loading state is true', () => {
    selectAuthLoading.mockImplementation(() => true)
    Loading.mockImplementation(() => <div>LoadingMock</div>)

    const { queryByText } = render(
      <Provider store={store}>
          <App />
      </Provider>
    )

    const LoadingComponent = queryByText('LoadingMock')

    expect(LoadingComponent).toBeInTheDocument()
  })

  it('renders PrivateRoutes when loading is false and user is not null', () => {
    const user: User = {
      id: 'test-id',
      name: 'test-user',
      email: 'test-user-email',
    }
    selectAuthLoading.mockImplementation(() => false)
    selectCurrentUser.mockImplementation(() => user)
    Landing.mockImplementation(() => <div>LandingMock</div>)

    const { getByText } = render(
      <Provider store={store}>
          <App />
      </Provider>
    )

    const PrivateRoutesComponent = getByText('LandingMock')

    expect(PrivateRoutesComponent).toBeInTheDocument()
  })
})
