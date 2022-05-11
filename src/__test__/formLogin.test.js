import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Fragment } from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '~/components/Layout';
import Toast from '~/components/Toast';
import { AuthContext } from '~/contexts/AuthContext';
import { publicRoutes } from '~/routes';

const setup = (currentRoute, valueContext) => {
    const history = createMemoryHistory();
    history.push(currentRoute);
    const { container } = render(
        <AuthContext.Provider value={valueContext}>
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
        </AuthContext.Provider>,
    );
    return container;
};

describe('When success login', () => {
    beforeEach(async () => {
        await act(() => {
            const provider = {
                isLogin: true,
                userInfo: {
                    email: 'caohoang2911@gmail.com',
                },
            };
            const container = setup(`${process.env.PUBLIC_URL}/`, provider);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('should render', () => {
        test('Should show button share', () => {
            expect(screen.getByTestId('btn-share')).toBeInTheDocument();
        });

        test('Should show button logout', () => {
            expect(screen.getByTestId('btn-logout')).toBeInTheDocument();
        });
    });

    describe('When click share button', () => {
        test('Should redirect to paht /share-video', async () => {
            const history = createMemoryHistory();
            await act(() => {
                fireEvent.click(screen.getByTestId('btn-share'));
                history.push('/share-video');
            });
            expect(history.location.pathname).toEqual('/share-video');
        });
    });
});
