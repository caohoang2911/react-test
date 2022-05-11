import classNames from 'classnames/bind';
import React, { memo, useContext } from 'react';
import { DisLikeIcon, LikeIcon } from '~/components/Icons';
import { VideoManageContext } from '~/contexts/VideoManageContext';
//style
import styles from './VideoItem.module.scss';

const cx = classNames.bind(styles);

const VideoItem = ({ id, title, description, email, vote }) => {
    function Favorite() {
        const { onFavorite, onUnFavorite } = useContext(VideoManageContext);
        return (
            <div className={cx('action-icon-group')}>
                {!vote ? (
                    <>
                        <LikeIcon onClick={() => onFavorite(id)} />
                        &nbsp;&nbsp;
                        <DisLikeIcon onClick={() => onUnFavorite(id)} />
                    </>
                ) : (
                    <>
                        {vote === 1 && <LikeIcon onClick={() => onFavorite(id)} />}
                        {vote === 2 && <DisLikeIcon onClick={() => onUnFavorite(id)} />}
                    </>
                )}
            </div>
        );
    }

    return (
        <>
            <div className={cx('wp-content-video')}>
                <iframe
                    title="youtube-video"
                    width="420"
                    height="315"
                    src={`https://www.youtube.com/embed/${id}`}
                ></iframe>
            </div>
            <div className={cx('wp-content-text')}>
                <h1>
                    <a href={`https://www.youtube.com/watch?v=${id}`} blank="_target">
                        {title}
                    </a>
                </h1>
                <Favorite />
                <h4 dangerouslySetInnerHTML={{ __html: description }}></h4>
                <hr className={cx('line')} />
                <h5>Author: {email}</h5>
            </div>
        </>
    );
};
export default memo(VideoItem);
