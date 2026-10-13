import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FooterBottom.module.css';

const FooterBottom: React.FC = () => {
    return (
        <div className={`container ${styles.bottomBar}`}>
            <div className={styles.left}>
                Вы принимаете условия политики в отношении <a href="#">обработки персональных данных</a> и <a href="#">пользовательского
                соглашения</a> каждый раз, когда оставляете свои данные в любой форме обратной связи на сайте
            </div>
            <div className={styles.right}>
                <Link to="/terms" className={styles.link}>
                    Пользовательское соглашение
                </Link>
                <Link to="/offer" className={styles.link}>
                    Оферта
                </Link>
            </div>
        </div>
    );
};

export default FooterBottom;
