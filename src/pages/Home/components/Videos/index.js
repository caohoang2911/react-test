import React, { useEffect, useMemo } from 'react';

import useVideoData from './../../hooks/useVideoData';
import styles from './Videos.module.scss';
import classNames from 'classnames/bind';
import VideoItem from '../VideoItem';

const cx = classNames.bind(styles);

export default function Videos() {
    const { videoList } = useVideoData();

    const renderVideoList = useMemo(() => {
        return videoList.map((video, index) => {
            const videoID = video?.link.split('?v=')[1];
            return (
                <div className={cx('wp-content')} key={index} style={{ marginTop: '30px' }}>
                    <VideoItem videoID={videoID} {...video} />
                </div>
            );
        });
    }, [videoList]);

    if (!videoList.length) {
        return <div className={cx('no-video')}>No video</div>;
    }
    return <div className={cx('wapper')}>{renderVideoList}</div>;
}
