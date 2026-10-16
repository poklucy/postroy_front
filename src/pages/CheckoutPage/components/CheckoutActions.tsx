import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Checkbox } from '@/components/common/Checkbox';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import styles from '../CheckoutPage.module.css';

interface CheckoutActionsProps {
    consent: boolean;
    onConsentChange: (value: boolean) => void;
    consentError?: string;
    formError: string;
    isSubmitting: boolean;
    onSubmit: () => void;
    className?: string;
}

export const CheckoutActions: React.FC<CheckoutActionsProps> = ({
                                                                    consent,
                                                                    onConsentChange,
                                                                    consentError,
                                                                    formError,
                                                                    isSubmitting,
                                                                    onSubmit,
                                                                    className,
                                                                }) => (
    <div className={[styles.actions, className].filter(Boolean).join(' ')}>
        <div className={styles.consent}>
            <Checkbox
                checked={consent}
                onChange={onConsentChange}
                label="Согласие на сбор и обработку персональных данных на условиях"
                className={styles.consentCheckbox}
            />
            <Link to="/about" className={styles.consentLink}>Политики обработки персональных данных</Link>
            {consentError && <span className={styles.errorText}>{consentError}</span>}
        </div>

        {formError && <p className={styles.formError} role="alert">{formError}</p>}

        <Button variant="orange" size="md" fullWidth onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? STATUS_MESSAGES.checkout.submitting : 'Перейти к оплате'}
        </Button>
    </div>
);
