import React from 'react';
import useVideoData from './../pages/Home/hooks/useVideoData';

export const VideoManageContext = React.createContext();

export const VideoManageContextProvider = ({ children }) => {
    const { videoList, onFavorite, onUnFavorite } = useVideoData();

    const provider = {
        videoList,

        onFavorite,
        onUnFavorite,
    };

    return <VideoManageContext.Provider value={provider}>{children}</VideoManageContext.Provider>;
};
