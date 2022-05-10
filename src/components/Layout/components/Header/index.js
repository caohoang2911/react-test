// Vendor
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

//style
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

//component
import Button from '~/components/Button';
import Input from '~/components/Input';

//context
import { AuthContext } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

function Header() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isLogin, userInfo, onLogin, onLogout, onRegister } = useContext(AuthContext);
    // Handle logic
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <h1 className={cx('logo')}>
                        <img alt="logo" width={40} height={40} src="https://img.icons8.com/ios/344/crazy.png" />
                        Funny video
                    </h1>
                </Link>
                <div className={cx('actions')}>
                    {isLogin ? (
                        <>
                            <span className={cx('wellcome')}>Wellcom {userInfo.email}</span>
                            <Button text outline to="/share-video">
                                Share a movie
                            </Button>
                            <Button primary onClick={onLogout}>
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Input
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                type="email"
                                placeholder="Email"
                                onKeyDown={handleEnter}
                            />
                            <div style={{ margin: '0px  5px' }}></div>
                            <Input
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type="password"
                                placeholder="Password"
                                onKeyDown={handleEnter}
                            />
                            <div className={cx('action-auth')}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onLogin({ email, password });
                                    }}
                                >
                                    Log in
                                </a>
                                &nbsp;/&nbsp;{' '}
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onRegister({ email, password });
                                    }}
                                >
                                    Register
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
