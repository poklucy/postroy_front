import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { formatPrice } from '@/utils';
import { FEATURES } from '@/config/features.config';
import styles from './CartSummary.module.css';

interface CartSummaryProps {
    positionsCount: number;
    totalPrice: number;
    weight?: number;
    bonusPoints?: number;
    onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
                                                            positionsCount,
                                                            totalPrice,
                                                            weight,
                                                            bonusPoints,
                                                            onCheckout,
                                                        }) => {
    return (
        <aside className={styles.summary}>
            <div className={styles.topBlock}>
                <div className={styles.row}>
                    <span>Общее количество позиций:</span>
                    <span className={styles.value}>{positionsCount}</span>
                </div>
                {weight !== undefined && (
                    <div className={styles.row}>
                        <span>Вес заказа:</span>
                        <span className={styles.value}>{weight} кг</span>
                    </div>
                )}
            </div>

            <div className={styles.bottomBlock}>
                <div>
                    <div className={styles.totalRow}>
                        <span>Итого к оплате:</span>
                        <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
                    </div>

                    <p className={styles.note}>
                        {FEATURES.loyalty ? 'Промокод и бонусы - на следующем шаге' : 'Промокод - на следующем шаге'}
                    </p>

                    {bonusPoints !== undefined && (
                        <p className={styles.note}>
                            Начислим баллы: <span className={styles.bonus}>+{bonusPoints}</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_4204_57474)">
                                    <path
                                        d="M7 0C3.13437 0 0 3.13437 0 7C0 10.8656 3.13437 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13437 10.8656 0 7 0ZM7 12.8125C3.79063 12.8125 1.1875 10.2094 1.1875 7C1.1875 3.79063 3.79063 1.1875 7 1.1875C10.2094 1.1875 12.8125 3.79063 12.8125 7C12.8125 10.2094 10.2094 12.8125 7 12.8125Z"
                                        fill="#CCCBC7"/>
                                    <path
                                        d="M8.74351 3.94795C8.27476 3.53701 7.65601 3.31201 6.99976 3.31201C6.34351 3.31201 5.72476 3.53857 5.25601 3.94795C4.76851 4.37451 4.49976 4.94795 4.49976 5.56201V5.68076C4.49976 5.74951 4.55601 5.80576 4.62476 5.80576H5.37476C5.44351 5.80576 5.49976 5.74951 5.49976 5.68076V5.56201C5.49976 4.87295 6.17319 4.31201 6.99976 4.31201C7.82632 4.31201 8.49976 4.87295 8.49976 5.56201C8.49976 6.04795 8.15601 6.49326 7.62319 6.69795C7.29194 6.82451 7.01069 7.04639 6.80913 7.33701C6.60444 7.63389 6.49819 7.99014 6.49819 8.35107V8.68701C6.49819 8.75576 6.55444 8.81201 6.62319 8.81201H7.37319C7.44194 8.81201 7.49819 8.75576 7.49819 8.68701V8.33232C7.499 8.18064 7.5455 8.03272 7.63162 7.90785C7.71775 7.78298 7.8395 7.68697 7.98101 7.63232C8.90288 7.27764 9.49819 6.46514 9.49819 5.56201C9.49976 4.94795 9.23101 4.37451 8.74351 3.94795ZM6.37476 10.437C6.37476 10.6028 6.4406 10.7617 6.55781 10.879C6.67502 10.9962 6.834 11.062 6.99976 11.062C7.16552 11.062 7.32449 10.9962 7.4417 10.879C7.55891 10.7617 7.62476 10.6028 7.62476 10.437C7.62476 10.2713 7.55891 10.1123 7.4417 9.99507C7.32449 9.87786 7.16552 9.81201 6.99976 9.81201C6.834 9.81201 6.67502 9.87786 6.55781 9.99507C6.4406 10.1123 6.37476 10.2713 6.37476 10.437Z"
                                        fill="#CCCBC7"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_4204_57474">
                                        <rect width="14" height="14" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>

                        </p>
                    )}
                </div>

                <div>
                    <Button variant="orange" size="md" fullWidth onClick={onCheckout}>
                        Оформить заказ
                    </Button>

                    <Link to="/catalog" className={styles.continueLink}>
                        Продолжить покупки <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9"
                                                viewBox="0 0 9 9" fill="none">
                        <path
                            d="M0.671594 8.73598L-0.000406206 8.06398L6.78359 1.27998L0.879594 0.879975L1.75959 -2.47955e-05L8.35159 0.367975L8.73559 6.95998L7.85559 7.83998L7.45559 1.95198L0.671594 8.73598Z"
                            fill="black"/>
                    </svg>
                    </Link>
                </div>
            </div>
        </aside>
    );
};
