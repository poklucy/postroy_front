import React from 'react';
import { Button } from '@/components/common/Button';
import styles from './CartEmpty.module.css';

export const CartEmpty: React.FC = () => {
    return (
        <div className={styles.cartEmpty}>
            <div className={styles.icon}>
                <svg
                    width="90"
                    height="82"
                    viewBox="0 0 90 82"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M23.6111 3.82617L12.5 18.9142V71.7222C12.5 73.723 13.2804 75.6418 14.6696 77.0566C16.0587 78.4714 17.9428 79.2662 19.9074 79.2662H71.7593C73.7238 79.2662 75.6079 78.4714 76.9971 77.0566C78.3862 75.6418 79.1667 73.723 79.1667 71.7222V18.9142L68.0556 3.82617H23.6111Z"
                        fill="#FF6900"
                    />
                    <path d="M12.5 20.2261H79.1667" stroke="white" strokeWidth="1.2" />
                    <path
                        d="M59.166 33.3461C59.166 37.6957 57.5857 41.8671 54.7726 44.9427C51.9596 48.0183 48.1443 49.7461 44.166 49.7461C40.1878 49.7461 36.3725 48.0183 33.5594 44.9427C30.7464 41.8671 29.166 37.6957 29.166 33.3461"
                        stroke="white"
                        strokeWidth="1.2"
                    />
                </svg>
            </div>

            <p className={styles.text}>
                В корзине пусто.
                <br />
                Чтобы добавить товары в корзину воспользуйтесь поиском или каталогом.
            </p>

            <Button variant="yellow" size="md" fullWidth to="/catalog">
                Перейти в каталог
            </Button>
        </div>
    );
};
