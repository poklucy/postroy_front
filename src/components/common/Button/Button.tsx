import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './Button.module.css';

export type ButtonVariant = 'orange' | 'yellow' | 'outline' | 'outlineLight';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

interface ButtonAsButton extends CommonProps {
    to?: undefined;
    href?: undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

interface ButtonAsLink extends CommonProps {
    to: LinkProps['to'];
    href?: undefined;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

interface ButtonAsAnchor extends CommonProps {
    href: string;
    to?: undefined;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'orange',
                                                  size = 'md',
                                                  className,
                                                  fullWidth,
                                                  icon,
                                                  ...rest
                                              }) => {
    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className || '',
    ]
        .filter(Boolean)
        .join(' ');

    const content = (
        <span className={styles.content}>
            {icon}
            {children}
        </span>
    );

    if (rest.to !== undefined) {
        const { to, onClick } = rest as ButtonAsLink;
        return (
            <Link to={to} className={classes} onClick={onClick}>
                {content}
            </Link>
        );
    }

    if (rest.href !== undefined) {
        const { href, onClick } = rest as ButtonAsAnchor;
        return (
            <a href={href} className={classes} onClick={onClick}>
                {content}
            </a>
        );
    }

    const { onClick, type = 'button', disabled } = rest as ButtonAsButton;
    return (
        <button type={type} className={classes} onClick={onClick} disabled={disabled}>
            {content}
        </button>
    );
};
