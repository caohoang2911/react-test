import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

const Input = React.forwardRef(
    (
        {
            type = 'text',
            rounded = false,
            disabled = false,
            children,
            className,
            leftIcon,
            rightIcon,
            placeholder,
            onChange,
            ...passProps
        },
        ref,
    ) => {
        const props = {
            onChange,
            ...passProps,
        };

        // Remove event listener when btn is disabled
        if (disabled) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith('on') && typeof props[key] === 'function') {
                    delete props[key];
                }
            });
        }

        return (
            <input
                placeholder={placeholder}
                className={cx(className, 'text-input')}
                type={type}
                ref={ref}
                disabled={disabled}
                onChange={onChange}
            />
        );
    },
);

export default Input;
