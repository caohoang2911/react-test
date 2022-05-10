import localForage from 'localforage';
import React, { useEffect, useRef, useState } from 'react';
import toastUtils from '~/ultils/Toast';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const userRegisted = useRef([]);

    useEffect(() => {
        localForage.getItem('isLogin').then((isLogin) => {
            if (isLogin) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        });
        localForage.getItem('userInfo').then((userInfo) => {
            if (userInfo) {
                setUserInfo(userInfo);
            } else {
                setUserInfo({});
            }
        });
        localForage.getItem('userRegisted').then((users) => {
            if (users) {
                userRegisted.current = users;
            } else {
                userRegisted.current = [];
            }
        });
    }, []);

    const onLogin = ({ email, password }) => {
        console.log(userRegisted.current, 'userRegisted.current');
        if (checkUserHasRegister(userRegisted.current, email)) {
            setIsLogin(true);
            userRegisted.current.push({ email, password });
            setUserInfo({ email });
            localForage.setItem('isLogin', true);
            localForage.setItem('userInfo', { email });
        } else {
            toastUtils.toastWarning('Please register');
        }
    };

    const onRegister = ({ email, password }) => {
        toastUtils.toastSuccess('Register');
        userRegisted.current.push({ email, password });
        localForage.setItem('userRegisted', userRegisted.current);
    };

    const onLogout = () => {
        setIsLogin(false);
        localForage.removeItem('isLogin');
        localForage.removeItem('userInfo');
    };

    // validate form

    // process function

    const checkUserHasRegister = (usersExist, email) => {
        return usersExist.some((user) => user.email === email);
    };

    const value = {
        isLogin,
        userInfo,

        onLogin,
        onRegister,
        onLogout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
