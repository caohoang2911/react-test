import React, { useEffect, useMemo } from 'react';
import useVideoData from './../../hooks/useVideoData';

export default function Videos() {
    const { videoList } = useVideoData();

    const renderVideoList = useMemo(() => {
        return videoList.map((video, index) => {
            const videoID = video?.link.split('?v=')[1];
            return (
                <div key={index} style={{ marginTop: '30px' }}>
                    <iframe width="420" height="315" src={`https://www.youtube.com/embed/${videoID}`}></iframe>
                    <h4>{video?.email}</h4>
                </div>
            );
        });
    }, [videoList]);

    if (!videoList.length) {
        return <div>No video</div>;
    }
    return <div>{renderVideoList}</div>;
}
