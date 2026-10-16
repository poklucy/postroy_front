import React from 'react';
import styles from './PersonPage.module.css';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Accordion } from '@/components/common/Accordion';
import { faqData } from '@/api/mockData/accordion';
import { Button } from '@/components/common/Button';
import { ContactForm } from '@/components/common/ContactForm';
import { AdvantagesGrid } from '@/components/common/AdvantagesGrid';
import { BUSINESS_ADVANTAGES } from '@/data/advantages';

export const PersonPage: React.FC = () => {

    return (
        <div className={`page`}>
            <div className={styles.headerPerson}>
                <div className={styles.background}></div>
                <div className={styles.headerContainer}>
                    <div className={styles.accent}>ПОСТРОЙ БИЗНЕС</div>
                    <h1>Инструмент под ваши задачи</h1>
                    <p>Профессионально обеспечиваем материалами объекты в строительной индустрии</p>
                    <Button href="#request" variant="yellow" size="lg" className={styles.button}>
                        Подать заявку
                    </Button>
                    <svg width="125" height="125" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M125 100L125 0L104 -9.17939e-07L104 125L125 100Z" fill="white"/>
                        <path d="M25 7.64867e-09L125 0V21L-1.09278e-06 21L25 7.64867e-09Z" fill="white"/>
                    </svg>
                </div>
            </div>
            <Breadcrumbs/>
            <div className={styles.pagePerson}>
                <h1>Условия сотрудничества</h1>

                <div className={styles.conditionsContainer}>
                    <div className={styles.conditionsInfo}>
                        <p>“Построй” — надежный поставщик стройматериалов для юридических лиц и индивидуальных предпринимателей.</p>
                        <div className={styles.listContainer}>
                            <ul className={styles.list}>
                                <p className='bold-text'>Вам подходит наше предложение, если:</p>
                                <li>Вы работаете в строительной сфере</li>
                                <li>Регулярно заказываете стройматериалы для объектов</li>
                                <li>Ваш месячный объем закупок — от 500 000 ₽</li>
                                <li>Вам нужна отсрочка платежа и гибкие условия</li>
                            </ul>
                            <ul className={styles.list}>
                                <p className='bold-text'>Наши преимущества:</p>
                                <li>Работаем по 44-ФЗ, 223-ФЗ, 275-ФЗ</li>
                                <li>Предоставляем закрывающие документы</li>
                                <li>Осуществляем доставку на объект</li>
                                <li>Предлагаем скидки от объема</li>
                            </ul>
                        </div>
                    </div>
                    <div id="request" className={styles.modalContainer}>
                        <div className={styles.accentBreadcrumbs}>
                            Остались вопросы?
                        </div>
                        <h3>Получите персональное предложение по вашей заявке</h3>
                        <div className={styles.modalContainerMain}>
                            <div className={styles.decor}>
                                <svg width="125" height="107" viewBox="0 0 125 107" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M-9.11383e-07 21L-4.5897e-06 105L18 105L18 -1.31134e-07L-9.11383e-07 21Z"
                                          fill="white"/>
                                    <path d="M84 107L0 107V89L105 89L84 107Z" fill="white"/>
                                </svg>
                            </div>
                            <p>Наш менеджер ответит на все ваши вопросы и подготовит для вас КП с актуальными ценами
                                ниже розничных и оптимальными условиями поставки.</p>
                            <ContactForm />
                        </div>
                    </div>
                </div>

                <AdvantagesGrid items={BUSINESS_ADVANTAGES} mobileScroll />

                <div className={styles.accordionSection}>
                    <div className={styles.accentBreadcrumbs}>
                        Часто задаваемые вопросы
                    </div>
                    <Accordion items={faqData}/>
                </div>
            </div>
        </div>
    );
};
