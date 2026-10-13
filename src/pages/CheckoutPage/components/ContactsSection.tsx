import React from 'react';
import { Input } from '@/components/common/Input';
import { formatPhoneInput, PHONE_PLACEHOLDER } from '@/utils/phone';
import { CheckoutContacts, CheckoutErrors } from '../checkout.utils';
import styles from '../CheckoutPage.module.css';

interface ContactsSectionProps {
    contacts: CheckoutContacts;
    errors: CheckoutErrors;
    onChange: (field: keyof CheckoutContacts, value: string) => void;
}

const FIELDS: {
    field: keyof CheckoutContacts;
    placeholder: string;
    type?: string;
    autoComplete: string;
}[] = [
    { field: 'firstName', placeholder: 'Имя', autoComplete: 'given-name' },
    { field: 'lastName', placeholder: 'Фамилия', autoComplete: 'family-name' },
    { field: 'phone', placeholder: PHONE_PLACEHOLDER, type: 'tel', autoComplete: 'tel' },
    { field: 'email', placeholder: 'E-mail', type: 'email', autoComplete: 'email' },
];

const GROUPS: { label: string; fields: (keyof CheckoutContacts)[] }[] = [
    { label: 'Заказ получит:', fields: ['firstName', 'lastName'] },
    { label: 'Номер телефона', fields: ['phone'] },
    { label: 'Чек отправить на почту:', fields: ['email'] },
];

export const ContactsSection: React.FC<ContactsSectionProps> = ({ contacts, errors, onChange }) => (
    <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Контактные данные</h2>

        {GROUPS.map(group => (
            <div key={group.label} className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>{group.label}</span>
                {FIELDS.filter(f => group.fields.includes(f.field)).map(({ field, placeholder, type, autoComplete }) => (
                    <Input
                        key={field}
                        name={field}
                        type={type ?? 'text'}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                        value={contacts[field]}
                        error={errors[field]}
                        wrapperClassName={styles.field}
                        onChange={(e) =>
                            onChange(field, field === 'phone' ? formatPhoneInput(e.target.value) : e.target.value)
                        }
                    />
                ))}
            </div>
        ))}
    </section>
);
