import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  sendSmsCode,
  verifySmsCode,
  resetSmsState,
  clearError,
  selectIsLoading,
  selectAuthError,
} from '@/store/slices/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { formatPhone, formatPhoneInput, isPhoneComplete, PHONE_PLACEHOLDER } from '@/utils/phone';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import styles from './SmsAuthForm.module.css';

interface SmsAuthFormProps {
  titleTag?: 'h1' | 'h2';
  onSuccess?: () => void;
}

export const SmsAuthForm: React.FC<SmsAuthFormProps> = ({ titleTag: Title = 'h2', onSuccess }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectAuthError);

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [demoCode, setDemoCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');

  useEffect(() => {
    dispatch(clearError());
  }, [step, dispatch]);

  const handleSendSms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneComplete(phone)) return;

    const result = await dispatch(sendSmsCode(phone));
    if (sendSmsCode.fulfilled.match(result)) {
      setDemoCode(result.payload.code);
      setStep('code');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;

    const result = await dispatch(verifySmsCode({ phone, code }));
    if (verifySmsCode.fulfilled.match(result)) {
      onSuccess?.();
    }
  };

  const handleBack = () => {
    setStep('phone');
    setCode('');
    setDemoCode('');
    dispatch(resetSmsState());
  };

  return (
    <div className={styles.form}>
      <Title className={styles.title}>
        {step === 'phone' ? 'Авторизация' : 'Подтверждение'}
      </Title>
      <p className={styles.subtitle}>
        {step === 'phone'
          ? 'Введите номер телефона для получения кода'
          : `Код отправлен на номер ${formatPhone(phone)}`}
      </p>

      {error && <div className={styles.error} role="alert">{error}</div>}

      <form className={styles.fields} onSubmit={step === 'phone' ? handleSendSms : handleVerifyCode}>
        {step === 'phone' ? (
          <>
            <Input
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
              placeholder={PHONE_PLACEHOLDER}
              disabled={isLoading}
              aria-label="Номер телефона"
              autoFocus
            />
            <Button type="submit" fullWidth disabled={isLoading || !isPhoneComplete(phone)}>
              {isLoading ? STATUS_MESSAGES.auth.sendingCode : 'Получить код'}
            </Button>
          </>
        ) : (
          <>
            <Input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Код из SMS"
              disabled={isLoading}
              aria-label="Код из SMS"
              autoFocus
            />
            <Button type="submit" fullWidth disabled={isLoading || code.length !== 6}>
              {isLoading ? STATUS_MESSAGES.auth.verifying : 'Войти'}
            </Button>
          </>
        )}
      </form>

      {step === 'code' && demoCode && (
        <p className={styles.demo}>
          Демо-режим, SMS не отправляется. Ваш код: <b>{demoCode}</b>
        </p>
      )}

      {step === 'code' ? (
        <button type="button" className={styles.backBtn} onClick={handleBack} disabled={isLoading}>
          Изменить номер
        </button>
      ) : (
        <p className={styles.hint}>Если вы у нас впервые, аккаунт будет создан автоматически</p>
      )}
    </div>
  );
};
