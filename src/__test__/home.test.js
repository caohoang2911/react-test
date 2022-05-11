import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Fragment } from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '~/components/Layout';
import Toast from '~/components/Toast';
import { AuthProvider } from '~/contexts/AuthContext';
import Home from '~/pages/Home';
import { publicRoutes } from '~/routes';

const setup = () => {
    const { container } = render(
        <AuthProvider>
            <Toast />
            <Home />
        </AuthProvider>,
    );

    return container;
};

describe('Home page', () => {
    beforeEach(async () => {
        await act(() => {
            const { container } = setup();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('No video', () => {
        expect(screen.getByText('No video')).toBeInTheDocument();
    });
});
