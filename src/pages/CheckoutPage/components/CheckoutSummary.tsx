import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PromoCode } from '@/api/mockData/checkout';
import { Button } from '@/components/common/Button';
import { Checkbox } from '@/components/common/Checkbox';
import { Input } from '@/components/common/Input';
import { Switch } from '@/components/common/Switch';
import { QuestionIcon } from '@/components/common/icons';
import { formatPrice } from '@/utils';
import { CheckoutTotals } from '../checkout.utils';
import styles from '../CheckoutPage.module.css';

interface CheckoutSummaryProps {
    positionsCount: number;
    totals: CheckoutTotals;
    promo: PromoCode | null;
    promoError: string;
    onApplyPromo: (code: string) => void;
    onResetPromo: () => void;
    bonusAvailable: number;
    useBonus: boolean;
    onUseBonusChange: (value: boolean) => void;
    consent: boolean;
    onConsentChange: (value: boolean) => void;
    consentError?: string;
    formError: string;
    isSubmitting: boolean;
    onSubmit: () => void;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
                                                                    positionsCount,
                                                                    totals,
                                                                    promo,
                                                                    promoError,
                                                                    onApplyPromo,
                                                                    onResetPromo,
                                                                    bonusAvailable,
                                                                    useBonus,
                                                                    onUseBonusChange,
                                                                    consent,
                                                                    onConsentChange,
                                                                    consentError,
                                                                    formError,
                                                                    isSubmitting,
                                                                    onSubmit,
                                                                }) => {
    const [promoInput, setPromoInput] = useState(promo?.code ?? '');

    const handlePromoChange = (value: string) => {
        setPromoInput(value);
        if (promo) onResetPromo();
    };

    return (
        <aside className={styles.summary}>
            <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                    <span>Общее количество позиций:</span>
                    <span>{positionsCount}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span>Товары на сумму:</span>
                    <span>{formatPrice(totals.itemsTotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span>Стоимость доставки:</span>
                    <span>{totals.deliveryPrice ? formatPrice(totals.deliveryPrice) : 'Бесплатно'}</span>
                </div>
                {promo && (
                    <div className={styles.summaryRow}>
                        <span>
                            Скидка по промокоду
                            <span className={styles.summaryNote}>{promo.code} {promo.description}</span>
                        </span>
                        <span>-{formatPrice(totals.promoDiscount)}</span>
                    </div>
                )}
                {totals.bonusSpent > 0 && (
                    <div className={styles.summaryRow}>
                        <span>Оплата баллами:</span>
                        <span>-{formatPrice(totals.bonusSpent)}</span>
                    </div>
                )}
            </div>

            <form
                className={styles.promo}
                onSubmit={(e) => {
                    e.preventDefault();
                    onApplyPromo(promoInput);
                }}
            >
                <Input
                    variant="filled"
                    placeholder="Промокод"
                    value={promoInput}
                    onChange={(e) => handlePromoChange(e.target.value)}
                    aria-label="Промокод"
                />
                {promo ? (
                    <div className={styles.promoApplied} role="status">Код применен</div>
                ) : (
                    <Button type="submit" variant="outline" fullWidth disabled={!promoInput.trim()}>
                        Применить
                    </Button>
                )}
                {promoError && <span className={styles.errorText}>{promoError}</span>}
            </form>

            <div className={styles.bonusToggle}>
                <Switch checked={useBonus} disabled={bonusAvailable === 0} onChange={onUseBonusChange}>
                    Оплатить бонусными баллами
                    <span className={styles.summaryNote}>
                        Доступно: {bonusAvailable.toLocaleString('ru-RU')} баллов = {formatPrice(bonusAvailable)}
                    </span>
                </Switch>
                <span className={styles.hintIcon} title="1 балл = 1 ₽. Баллами можно оплатить заказ полностью, кроме доставки">
                    <QuestionIcon size={20} />
                </span>
            </div>

            <div className={styles.summaryTotal}>
                <div className={styles.summaryTotalRow}>
                    <span>Итого к оплате:</span>
                    <span className={styles.summaryTotalPrice}>{formatPrice(totals.totalPrice)}</span>
                </div>
                <div className={styles.summaryBonus}>
                    Начислим баллы: <span className={styles.bonusValue}>+{totals.bonusEarned}</span>
                    <span className={styles.hintIconSmall} title="Начисляем 1% от оплаченной суммы товаров">
                        <QuestionIcon />
                    </span>
                </div>
            </div>

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

            {formError && <p className={styles.formError}>{formError}</p>}

            <Button variant="orange" size="md" fullWidth onClick={onSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Оформляем заказ...' : 'Перейти к оплате'}
            </Button>
        </aside>
    );
};
