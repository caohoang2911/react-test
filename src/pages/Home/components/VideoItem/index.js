import React from 'react';

//style
import styles from './VideoItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function VideoItem({ videoID, title, description, email }) {
    return (
        <>
            <div className={cx('wp-content-video')}>
                <iframe width="420" height="315" src={`https://www.youtube.com/embed/${videoID}`}></iframe>
            </div>
            <div className={cx('wp-content-text')}>
                <h1>
                    <a href={title} blank="_target">
                        {title}
                    </a>
                </h1>
                <h4 dangerouslySetInnerHTML={{ __html: description }}></h4>
                <hr className={cx('line')} />
                <h5>Author: {email}</h5>
            </div>
        </>
    );
}
