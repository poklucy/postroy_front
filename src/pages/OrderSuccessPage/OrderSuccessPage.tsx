import React from 'react';
import { Button } from '@/components/common/Button';
import { ROUTES } from '@/config/routes.config';
import { useAppSelector } from '@/store/hooks';
import { selectLastOrder } from '@/store/slices/checkout/checkout.selectors';
import { formatPrice } from '@/utils';
import styles from './OrderSuccessPage.module.css';

export const OrderSuccessPage: React.FC = () => {
  const order = useAppSelector(selectLastOrder);

  return (
    <div className={styles.successPage}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.icon}>🎉</div>
          <h1 className={styles.title}>Заказ оформлен!</h1>
          <p className={styles.subtitle}>
            Спасибо за ваш заказ. Наш менеджер свяжется с вами в ближайшее время.
          </p>

          {order && (
            <div className={styles.orderInfo}>
              <div className={styles.orderNumber}>
                Номер заказа: <span>{order.orderNumber}</span>
              </div>
              <div className={styles.orderTotal}>
                Сумма: <span>{formatPrice(order.totalPrice)}</span>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <Button to={ROUTES.PROFILE_ORDERS} className={styles.action}>
              Мои заказы
            </Button>
            <Button to={ROUTES.HOME} variant="outline" className={styles.action}>
              Продолжить покупки
            </Button>
          </div>

          <div className={styles.info}>
            <p>📧 Подтверждение заказа отправлено на вашу почту</p>
            <p>📱 Статус заказа можно отслеживать в личном кабинете</p>
          </div>
        </div>
      </div>
    </div>
  );
};
