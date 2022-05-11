import { VideoManageContextProvider } from '~/contexts/VideoManageContext';
import Videos from './components/Videos';

function Home() {
    return (
        <VideoManageContextProvider>
            <Videos />
        </VideoManageContextProvider>
    );
}

export default Home;
