import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addAddress, removeAddress, updateProfile } from '@/store/slices/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { UserProfile } from '@/types/user.types';
import { formatPhone } from '@/utils/phone';
import styles from '../ProfilePage.module.css';

interface ProfileEditFormProps {
    profile: UserProfile;
    onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, onClose }) => {
    const dispatch = useAppDispatch();
    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.email);
    const [newAddress, setNewAddress] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() && !EMAIL_RE.test(email.trim())) {
            setEmailError('Введите корректный e-mail');
            return;
        }
        dispatch(updateProfile({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() }));
        onClose();
    };

    const handleAddAddress = () => {
        if (!newAddress.trim()) return;
        dispatch(addAddress(newAddress));
        setNewAddress('');
    };

    return (
        <form className={styles.editForm} onSubmit={handleSubmit}>
            <h2 className={styles.editTitle}>Личные данные</h2>

            <div className={styles.editGrid}>
                <label className={styles.editField}>
                    <span>Имя</span>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Имя" autoComplete="given-name" />
                </label>
                <label className={styles.editField}>
                    <span>Фамилия</span>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Фамилия" autoComplete="family-name" />
                </label>
                <label className={styles.editField}>
                    <span>E-mail</span>
                    <Input
                        type="email"
                        value={email}
                        error={emailError}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('');
                        }}
                        placeholder="E-mail"
                        autoComplete="email"
                    />
                </label>
                <label className={styles.editField}>
                    <span>Телефон для входа</span>
                    <Input value={formatPhone(profile.phone)} disabled />
                </label>
            </div>

            <div className={styles.addresses}>
                <span className={styles.addressesTitle}>Адреса доставки</span>
                {profile.addresses.length === 0 && <p className={styles.muted}>Сохранённых адресов пока нет</p>}
                <ul className={styles.addressList}>
                    {profile.addresses.map(address => (
                        <li key={address.id} className={styles.addressItem}>
                            <span>{address.value}</span>
                            <button
                                type="button"
                                className={styles.textButton}
                                onClick={() => dispatch(removeAddress(address.id))}
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
                <div className={styles.newAddress}>
                    <Input
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddAddress();
                            }
                        }}
                        placeholder="Город, улица, дом, квартира"
                    />
                    <Button variant="outline" onClick={handleAddAddress} disabled={!newAddress.trim()}>
                        Добавить адрес
                    </Button>
                </div>
            </div>

            <div className={styles.editActions}>
                <Button type="submit">Сохранить</Button>
                <button type="button" className={styles.textButton} onClick={onClose}>Отмена</button>
            </div>
        </form>
    );
};
