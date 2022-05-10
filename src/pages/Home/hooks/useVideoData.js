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
                if (videos && videos.length) {
                    dispatch({ type: 'setVideoList', data: videos });
                }
            })
            .then((err) => {
                console.log(err);
            });
    }, []);

    const onFavorite = (id) => {
        dispatch({ type: 'favorite', id });
    };

    const onUnFavorite = (id) => {
        dispatch({ type: 'unFavorite', id });
    };

    return {
        videoList,

        onFavorite,
        onUnFavorite,
    };
}

export default useVideoData;
