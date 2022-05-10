import React from 'react';
import classNames from 'classnames/bind';
import styles from './Fieldset.module.scss';

const cx = classNames.bind(styles);

export default function Fieldset({ children }) {
    return (
        <>
            <fieldset className={cx('fieldset')}>
                <legend className={cx('legend')}>Personalia:</legend>
                {children}
            </fieldset>
        </>
    );
}
