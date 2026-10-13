import React, { forwardRef } from 'react';
import styles from './Input.module.css';

type FieldVariant = 'outlined' | 'filled';

interface FieldProps {
    error?: string;
    invalid?: boolean;
    variant?: FieldVariant;
    wrapperClassName?: string;
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & FieldProps;
export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps;

const fieldClassName = (variant: FieldVariant, invalid: boolean, className?: string) =>
    [styles.field, styles[variant], invalid ? styles.invalid : '', className].filter(Boolean).join(' ');

const Wrapper: React.FC<{ error?: string; className?: string; children: React.ReactNode }> = ({
                                                                                                    error,
                                                                                                    className,
                                                                                                    children,
                                                                                                }) => (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
        {children}
        {error && <span className={styles.error}>{error}</span>}
    </div>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ error, invalid = false, variant = 'outlined', wrapperClassName, className, ...rest }, ref) => (
        <Wrapper error={error} className={wrapperClassName}>
            <input
                ref={ref}
                className={fieldClassName(variant, invalid || Boolean(error), className)}
                aria-invalid={invalid || Boolean(error) || undefined}
                {...rest}
            />
        </Wrapper>
    )
);

Input.displayName = 'Input';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ error, invalid = false, variant = 'outlined', wrapperClassName, className, rows = 4, ...rest }, ref) => (
        <Wrapper error={error} className={wrapperClassName}>
            <textarea
                ref={ref}
                rows={rows}
                className={fieldClassName(variant, invalid || Boolean(error), [styles.textarea, className].filter(Boolean).join(' '))}
                aria-invalid={invalid || Boolean(error) || undefined}
                {...rest}
            />
        </Wrapper>
    )
);

TextArea.displayName = 'TextArea';
