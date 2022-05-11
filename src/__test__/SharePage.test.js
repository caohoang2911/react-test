import { act, fireEvent, render, screen } from '@testing-library/react';
import Toast from '~/components/Toast';
import { AuthContext, AuthProvider } from '~/contexts/AuthContext';
import { VideoManageContext } from '~/contexts/VideoManageContext';
import Home from '~/pages/Home';
import ShareVideo from '~/pages/ShareVideo';
const setup = (authValue) => {
    const { container } = render(
        <AuthContext.Provider value={authValue}>
            <Toast />
            <ShareVideo />
        </AuthContext.Provider>,
    );
    return container;
};
describe('<ShareVide  />', () => {
    describe('When logged', () => {
        beforeEach(async () => {
            const valueAuth = {
                isLogin: true,
            };
            await act(() => {
                setup(valueAuth);
            });
        });

        test('Should show share form', () => {
            expect(screen.getByTestId('test-form')).toBeInTheDocument();
        });

        test('Wrong format share', async () => {
            fireEvent.click(screen.getByTestId('btn-action-share'));
            expect(await screen.findByText('Wrong format url')).toBeInTheDocument();
        });

        test('Suscess push share', async () => {
            const inputShare = screen.getByPlaceholderText('Youtube url');

            fireEvent.change(inputShare, { target: { value: 'https://www.youtube.com/watch?v=Y-0zisStgKE' } });

            fireEvent.click(screen.getByTestId('btn-action-share'));

            expect(await screen.findByText('Share video success')).toBeInTheDocument();
        });
    });

    describe('When not login', () => {
        beforeEach(async () => {
            const valueAuth = {
                isLogin: false,
            };
            await act(() => {
                setup(valueAuth);
            });
        });

        test('Should remove share form', async () => {
            const form = await screen.queryByTestId('test-form');
            expect(form).not.toBeInTheDocument();
        });

        test('Should show share form', () => {
            expect(screen.getByText('Login to share video')).toBeInTheDocument();
        });
    });
});
