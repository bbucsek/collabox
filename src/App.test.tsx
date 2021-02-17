import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

const store = mockStore({
    authentication: {
        currentUser: null,
        loading: true,
    },
});

const storeLoadingFalse = mockStore({
    authentication: {
        currentUser: null,
        loading: false,
    },
});

const storeWithUser = mockStore({
    authentication: {
        currentUser: {
            id: "test-id",
            name: "test-user",
            email: "test-user-email",
        },
        loading: false,
    },
});

jest.mock("./components/Login", () => {
    return function Dummy() {
        return <div data-testid="login">"LoginMock"</div>;
    };
});

jest.mock("./components/Loading", () => {
    return function Dummy() {
        return <div data-testid="loading">"LoadingMock"</div>;
    };
});

jest.mock("./modules/PrivateRoutes/PrivateRoutes", () => {
    return function Dummy() {
        return <div data-testid="private-routes">"PrivateRoutesMock"</div>;
    };
});

describe("App component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

     it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });

    it("renders Login component when loading state is false and currentUser is null", () => {
        const { getByTestId } = render(
            <Provider store={storeLoadingFalse}>
                <App />
            </Provider>
        );

        const loginMock = getByTestId("login");
        expect(loginMock).toBeInTheDocument();
    });

    it("renders Loading component when loading state is true", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        const LoadingComponent = getByTestId("loading");
        expect(LoadingComponent).toBeInTheDocument();
    });

    it("renders PrivateRoutes when loading is false and user is not null", () => {
        const { getByTestId } = render(
            <Provider store={storeWithUser}>
                <App />
            </Provider>
        );

        const PrivateRoutesComponent = getByTestId("private-routes");
        expect(PrivateRoutesComponent).toBeInTheDocument();
    });
});
