import React, { useId, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { mockRequest } from '@/api/mock';
import { toRequestError } from '@/api/apiError';
import { STATUS_MESSAGES, getInlineErrorMessage } from '@/config/statusMessages';
import { formatPhoneInput, isPhoneComplete, PHONE_PLACEHOLDER } from '@/utils/phone';
import styles from './ContactForm.module.css';

interface ContactFormProps {
    onSubmit?: (phone: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
    const inputId = useId();
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isPhoneComplete(phone)) {
            setError(STATUS_MESSAGES.contactForm.invalidPhone);
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            await mockRequest('contact', 1000, () => onSubmit?.(phone));
            setIsSent(true);
        } catch (requestError) {
            setError(getInlineErrorMessage(toRequestError(requestError), STATUS_MESSAGES.contactForm.error));
        } finally {
            setIsLoading(false);
        }
    };

    if (isSent) {
        return <p className={styles.success}>{STATUS_MESSAGES.contactForm.success}</p>;
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
            <label className={styles.label} htmlFor={inputId}>
                Номер для связи
            </label>

            <Input
                id={inputId}
                type="tel"
                variant="filled"
                autoComplete="tel"
                value={phone}
                error={error}
                onChange={(e) => {
                    setPhone(formatPhoneInput(e.target.value));
                    setError('');
                }}
                placeholder={PHONE_PLACEHOLDER}
            />

            <Button type="submit" variant="yellow" size="lg" fullWidth disabled={isLoading}>
                {isLoading ? STATUS_MESSAGES.contactForm.sending : 'Оставить заявку'}
            </Button>
        </form>
    );
};
