import classNames from 'classnames/bind';
// library
import localForage from 'localforage';
import { useContext, useEffect, useRef, useState } from 'react';
// component
import Button from '~/components/Button';
import Fieldset from '~/components/Fieldset';
import Input from '~/components/Input';
import { STORE_KEY_VIDEO_SHARED } from '~/constant/variableConstant';
import { AuthContext } from '~/contexts/AuthContext';
import toastUtils from '~/ultils/Toast';
//style
import styles from './ShareVideo.module.scss';

const cx = classNames.bind(styles);

function ShareVideo() {
    const [loading, setLoading] = useState(false);

    const { userInfo, isLogin } = useContext(AuthContext);

    const inputRefVideo = useRef(null);

    useEffect(() => {
        if (isLogin) inputRefVideo.current.focus();
    }, []);

    const fetchInfoVideo = (idVideo) => {
        setLoading(true);
        return fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${idVideo}&key=AIzaSyAb-tgWhRAPsVofFsO0RXU21FmvnBYFj_4`,
        )
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(async function (responseAsJson) {
                const { title, description } = responseAsJson?.items[0].snippet;
                toastUtils.toastSuccess('Share video success');
                try {
                    const video = await localForage.getItem(STORE_KEY_VIDEO_SHARED);
                    if (video) {
                        video.unshift({
                            id: idVideo,
                            email: userInfo?.email,
                            link: inputRefVideo.current.value,
                            title,
                            vote: null,
                            description: description.replace(/\n/g, '<br />'),
                        });
                        localForage.setItem(STORE_KEY_VIDEO_SHARED, [...video]);
                    } else {
                        localForage.setItem(STORE_KEY_VIDEO_SHARED, [
                            {
                                id: idVideo,
                                email: userInfo?.email,
                                link: inputRefVideo.current.value,
                                title,
                                vote: null,
                                description: description.replace(/\n/g, '<br />'),
                            },
                        ]);
                    }
                } catch (err) {
                    // This code runs if there were any errors.
                    console.log(err);
                }
            })
            .catch((error) => {
                toastUtils.toastError("Can't share video! Please try again");
            })
            .finally(() => {
                inputRefVideo.current.value = null;
                inputRefVideo.current.focus();
                setLoading(false);
            });
    };

    const handleSubmitShareVideo = (e) => {
        e.preventDefault();
        const idVideo = inputRefVideo.current.value.split('watch?v=');
        if (idVideo.length > 1) {
            fetchInfoVideo(idVideo[1]);
        } else {
            toastUtils.toastWarning('Wrong format url');
        }
    };

    if (!isLogin) {
        return <h3 className={cx('login-required')}>Login to share video</h3>;
    }
    return (
        <div className={cx('wrapper')}>
            <Fieldset>
                <form data-testid="test-form" onSubmit={handleSubmitShareVideo} className={cx('form-wrapper')}>
                    <Input ref={inputRefVideo} placeholder="Youtube url" />
                    <Button data-testid="btn-action-share" type="submit" primary>
                        {!loading ? 'Share' : 'loading...'}
                    </Button>
                </form>
            </Fieldset>
        </div>
    );
}

export default ShareVideo;
