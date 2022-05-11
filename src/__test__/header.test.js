import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Fragment } from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '~/components/Layout';
import Toast from '~/components/Toast';
import { AuthProvider } from '~/contexts/AuthContext';
import { publicRoutes } from '~/routes';

const setup = (currentRoute) => {
    const history = createMemoryHistory();
    history.push(currentRoute);
    const { container } = render(
        <AuthProvider>
            <Toast />
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>,
    );

    return container;
};

describe('Header test', () => {
    beforeEach(async () => {
        await act(() => {
            const container = setup(`/`);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Test render form login', () => {
        // email value
        test('Should render input email', () => {
            const inputEmail = screen.getByPlaceholderText('Email');
            expect(inputEmail).toBeInTheDocument();
        });
        test('Should null input email initial', () => {
            const inputEmail = screen.getByPlaceholderText('Email');
            expect(inputEmail.value).toBe('');
        });
        // input password
        test('Should render input password', () => {
            const inputPassWord = screen.getByPlaceholderText('Password');
            expect(inputPassWord).toBeInTheDocument();
        });
        test('Should null input email initial', () => {
            const inputPassWord = screen.getByPlaceholderText('Password');
            expect(inputPassWord.value).toBe('');
        });

        test('Should render button password', () => {
            const buttonLogin = screen.getByTestId('button-login');
            expect(buttonLogin).toBeInTheDocument();
        });
    });

    describe('When click button login', () => {
        test('Email required', async () => {
            fireEvent.click(screen.getByText(/Log in/i));
            expect(await screen.findByText('Email is required')).toBeInTheDocument();
        });

        test('Email wrong format', async () => {
            const inputEmail = screen.getByPlaceholderText('Email');

            fireEvent.change(inputEmail, { target: { value: 'Good Day' } });

            const inputPassword = screen.getByPlaceholderText('Password');

            fireEvent.change(inputPassword, { target: { value: '123' } });

            fireEvent.click(screen.getByText(/Log in/i));
            expect(await screen.findByText('Email wrong format')).toBeInTheDocument();
        });

        test('Password required', async () => {
            const inputEmail = screen.getByPlaceholderText('Email');

            fireEvent.change(inputEmail, { target: { value: 'Good Day' } });

            fireEvent.click(screen.getByText(/Log in/i));
            expect(await screen.findByText('Password is required')).toBeInTheDocument();
        });
    });
});
