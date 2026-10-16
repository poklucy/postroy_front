import React from 'react';
import { Button } from '@/components/common/Button';
import { ChevronIcon } from '@/components/common/icons';
import { AVAILABLE_PAYMENT_METHODS } from '@/config/checkout.config';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import { PaymentMethod } from '@/types/order.types';
import styles from '../CheckoutPage.module.css';

const PAYMENT_ICONS: Record<PaymentMethod, React.ReactNode> = {
    store: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 3H19V21L16.5 19.5L14 21L12 19.5L10 21L7.5 19.5L5 21V3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M8 8H16M8 12H16M8 16H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    ),
    card: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2.6" y="5.6" width="18.8" height="12.8" rx="1.4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M2.6 9.5H21.4M6 15H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    ),
    cash: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2.6" y="10.6" width="18.8" height="9.8" rx="1.4" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="12" cy="15.5" r="2.2" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="9" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="15.5" cy="5.5" r="2.4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
    ),
    sbp: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 4L12 8V16L5 20V4Z" fill="#5B57A2" />
            <path d="M12 8L19 4V12L12 16V8Z" fill="#1D9F54" />
            <path d="M12 16L19 12V20L12 16Z" fill="#F6A21E" />
        </svg>
    ),
};

interface PaymentStepProps {
    value: PaymentMethod;
    onChange: (value: PaymentMethod) => void;
    onBack: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
    error: string;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ value, onChange, onBack, onSubmit, isSubmitting, error }) => (
    <>
        <button type="button" className={styles.backButton} onClick={onBack}>
            <ChevronIcon direction="left" />
            <span>Вернуться на предыдущий шаг</span>
        </button>

        <p className={styles.stepTitle}>Шаг 2 — оплата заказа</p>

        <section className={styles.payment}>
            <h2 className={styles.sectionTitle}>Выбор способа оплаты</h2>

            <div className={styles.paymentOptions} role="radiogroup" aria-label="Способ оплаты">
                {AVAILABLE_PAYMENT_METHODS.map(method => (
                    <label
                        key={method.value}
                        className={`${styles.paymentOption} ${value === method.value ? styles.paymentOptionActive : ''}`}
                    >
                        <input
                            type="radio"
                            name="payment"
                            value={method.value}
                            checked={value === method.value}
                            onChange={() => onChange(method.value)}
                            className={styles.visuallyHidden}
                        />
                        <span className={styles.paymentIcon}>{PAYMENT_ICONS[method.value]}</span>
                        {method.label}
                    </label>
                ))}
            </div>

            {error && <p className={styles.formError} role="alert">{error}</p>}

            <Button variant="orange" size="md" fullWidth onClick={onSubmit} disabled={isSubmitting}>
                {isSubmitting ? STATUS_MESSAGES.checkout.submitting : 'Оформить заказ'}
            </Button>
        </section>
    </>
);
