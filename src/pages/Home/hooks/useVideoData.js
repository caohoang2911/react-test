import localForage from 'localforage';
import { useEffect, useReducer } from 'react';
import videosReducer from './videoReducer';

function useVideoData() {
    const [{ videoList }, dispatch] = useReducer(videosReducer, {
        videoList: [],
        error: null,
        imageRerenderIdentifier: 0,
    });
    useEffect(() => {
        localForage
            .getItem('videoShared')
            .then((videos) => {
                console.log(videos, 'videos');
                if (videos && videos.length) {
                    dispatch({ type: 'setVideoList', data: videos });
                }
            })
            .then((err) => {
                console.log(err);
            });
    }, []);
    return {
        videoList,
    };
}

export default useVideoData;
