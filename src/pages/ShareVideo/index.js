import Button from '~/components/Button';
import Input from '~/components/Input';

import styles from './ShareVideo.module.scss';
import classNames from 'classnames/bind';
import Fieldset from '~/components/Fieldset';
import { useRef, useEffect, useContext } from 'react';
import localForage from 'localforage';
import { AuthContext } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

function ShareVideo() {
    const { userInfo } = useContext(AuthContext);

    const inputRefVideo = useRef(null);

    useEffect(() => {
        inputRefVideo.current.focus();
    });
    const handleSubmitShareVideo = async (e) => {
        e.preventDefault();
        try {
            const video = await localForage.getItem('videoShared');
            if (video) {
                video.push({ email: userInfo?.email, link: inputRefVideo.current.value });
                localForage.setItem('videoShared', [...video]);
            } else {
                localForage.setItem('videoShared', [{ email: userInfo?.email, link: inputRefVideo.current.value }]);
            }
        } catch (err) {
            // This code runs if there were any errors.
            console.log(err);
        }
        inputRefVideo.current.value = null;
    };

    return (
        <div className={cx('wrapper')}>
            <Fieldset>
                <form onSubmit={handleSubmitShareVideo} className={cx('form-wrapper')}>
                    <Input ref={inputRefVideo} placeholder="Youtube url" />
                    <Button type="submit" primary>
                        Share
                    </Button>
                </form>
            </Fieldset>
        </div>
    );
}

export default ShareVideo;
