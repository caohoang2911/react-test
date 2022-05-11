import { useEffect, useReducer } from 'react';

import localForage from 'localforage';
import videosReducer from './videoReducer';
import toastUtils from '~/ultils/Toast';

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
                toastUtils.toastWarning('Error on get video');
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
