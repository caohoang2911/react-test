import classNames from 'classnames/bind';
import React, { useContext, useMemo } from 'react';
import { VideoManageContext } from '~/contexts/VideoManageContext';
import VideoItem from '../VideoItem';
import styles from './Videos.module.scss';

const cx = classNames.bind(styles);

export default function Videos() {
    const { videoList } = useContext(VideoManageContext);

    const renderVideoList = useMemo(() => {
        return videoList.map((video, index) => {
            return (
                <div className={cx('wp-content')} key={index} style={{ marginTop: '30px' }}>
                    <VideoItem {...video} />
                </div>
            );
        });
    }, [videoList]);

    if (!videoList.length) {
        return <div className={cx('no-video')}>No video</div>;
    }
    return <div className={cx('wapper')}>{renderVideoList}</div>;
}
