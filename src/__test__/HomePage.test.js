import { act, render, screen } from '@testing-library/react';
import Toast from '~/components/Toast';
import { AuthProvider } from '~/contexts/AuthContext';
import { VideoManageContext } from '~/contexts/VideoManageContext';
import Home from '~/pages/Home';
const setup = (valueContext) => {
    const { container } = render(
        <AuthProvider>
            <Toast />
            <VideoManageContext.Provider value={valueContext}>
                <Home />
            </VideoManageContext.Provider>
        </AuthProvider>,
    );
    return container;
};
describe('<Home />', () => {
    beforeEach(async () => {
        const initialVideos = [
            {
                id: 'w4wew2',
                email: 'caohoang2911@gmail.com',
                link: 'https://www.youtube.com/',
                title: 'developer',
                vote: null,
                description: 'This descrition',
            },
        ];

        const provider = {
            videoList: initialVideos,
        };
        await act(() => {
            setup(provider);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Show show `Login to share video` text', async () => {
        expect(await screen.getByText('No video')).toBeInTheDocument();
    });
});

describe('when not video list', () => {
    beforeEach(async () => {
        const provider = {
            videoList: [],
        };
        await act(() => {
            setup(provider);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Show show `Login to share video` text', async () => {
        expect(await screen.getByText('No video')).toBeInTheDocument();
    });
});
