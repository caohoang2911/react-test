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
            setIsLogin(isLogin);
        });
        localForage.getItem('userInfo').then((userInfo) => {
            setUserInfo(userInfo ?? {});
        });
        localForage.getItem('userRegisted').then((users) => {
            userRegisted.current = users ?? [];
        });
    }, []);
    const validateForm = ({ email, password }) => {
        if (!email) {
            return 'Email is required';
        }
        if (!password) {
            return 'Password is required';
        }
        if (!validateEmail(email)) {
            return 'Email wrong format';
        }
    };
    const onLogin = ({ email, password }) => {
        const messageInValid = validateForm({ email, password });
        if (messageInValid) {
            return toastUtils.toastError(messageInValid);
        }
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
        const messageInValid = validateForm({ email, password });
        if (messageInValid) {
            return toastUtils.toastError(messageInValid);
        }
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

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};
