import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, selectUserProfile } from '@/store/slices/auth';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Button } from '@/components/common/Button';
import { ChevronIcon, CompareIcon, HeartIcon, QuestionIcon } from '@/components/common/icons';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ROUTES } from '@/config/routes.config';
import { BONUS_ACCRUAL_RATE } from '@/api/mockData/checkout';
import { formatPhone } from '@/utils/phone';
import { ProfileEditForm } from './components/ProfileEditForm';
import { BoxIcon, CartIcon, ClockIcon, CoinIcon, EditIcon, ReturnIcon } from './components/ProfileIcons';
import { FEATURES } from '@/config/features.config';
import styles from './ProfilePage.module.css';

interface ProfileLink {
    to: string;
    label: string;
    icon: React.ReactNode;
}

const PURCHASE_LINKS: ProfileLink[] = [
    { to: `${ROUTES.PROFILE_ORDERS}?tab=current`, label: 'Текущие заказы', icon: <CartIcon /> },
    { to: ROUTES.PROFILE_HISTORY, label: 'История покупок', icon: <BoxIcon /> },
    { to: `${ROUTES.PROFILE_ORDERS}?tab=returns`, label: 'Возвраты', icon: <ReturnIcon /> },
];

const LIST_LINKS: ProfileLink[] = [
    { to: ROUTES.FAVORITES, label: 'Избранное', icon: <HeartIcon /> },
    { to: ROUTES.COMPARE, label: 'Списки сравнения', icon: <CompareIcon /> },
    { to: ROUTES.PROFILE_VIEWED, label: 'История просмотров', icon: <ClockIcon /> },
];

const LinksCard: React.FC<{ links: ProfileLink[]; title?: string; ariaLabel?: string; centered?: boolean }> = ({
                                                                                                             links,
                                                                                                             title,
                                                                                                             ariaLabel,
                                                                                                             centered = false,
                                                                                                         }) => (
    <nav className={`${styles.card} ${centered ? styles.cardCentered : ''}`} aria-label={title ?? ariaLabel}>
        {title && <span className={styles.cardTitle}>{title}</span>}
        <ul className={styles.linkList}>
            {links.map(link => (
                <li key={link.label}>
                    <Link to={link.to} className={styles.cardLink}>
                        {link.icon}
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
);

export const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const profile = useAppSelector(selectUserProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [showBonusInfo, setShowBonusInfo] = useState(false);
    const isMobile = useMediaQuery('(max-width: 840px)');

    useEffect(() => {
        if (isEditing && isMobile) window.scrollTo(0, 0);
    }, [isEditing, isMobile]);

    if (!profile) return null;

    if (isEditing && isMobile) {
        return (
            <div className={`page ${styles.profilePage}`}>
                <Breadcrumbs/>
                <div className={styles.editHeader}>
                    <h1>Редактировать профиль</h1>
                    <button type="button" className={styles.backButton} onClick={() => setIsEditing(false)}>
                        <ChevronIcon direction="left" />
                        <span>Вернуться в профиль</span>
                    </button>
                </div>
                <ProfileEditForm profile={profile} onClose={() => setIsEditing(false)} />
            </div>
        );
    }

    const handleLogout = () => {
        navigate(ROUTES.HOME);
        dispatch(logout());
    };

    const fullName = [profile.lastName, profile.firstName].filter(Boolean).join(' ');

    return (
        <div className={`page ${styles.profilePage}`}>
            <Breadcrumbs/>
            <h1>Профиль</h1>

            <div className={styles.profileInfo}>
                <div className={styles.grid}>
                    <div className={styles.userColumn}>
                        <div className={styles.card}>
                            <span className={styles.userNumber}>#{profile.number}</span>
                            <div className={styles.userRow}>
                                <span className={styles.userName}>{fullName || formatPhone(profile.phone)}</span>
                                <button type="button" className={styles.editButton}
                                        onClick={() => setIsEditing(prev => !prev)}>
                                    <EditIcon/>
                                    <span>Редактировать</span>
                                </button>
                            </div>

                            {/*<div className={styles.divider}/>*/}

                            <div className={styles.userRow}>
                            {FEATURES.loyalty && (
                            <span className={styles.statLabel}>
                                Бонусы:
                                <span className={styles.bonusValue}>
                                    {profile.bonusPoints.toLocaleString('ru-RU')}
                                    <CoinIcon/>
                                </span>
                            </span>
                            )}
                            {/*    <span className={styles.statLabel}>*/}
                            {/*    Размер скидки:*/}
                            {/*    <span className={styles.discountValue}>{profile.discountPercent}%</span>*/}
                            {/*</span>*/}
                            </div>

                            {FEATURES.loyalty && (
                            <button type="button" className={styles.hintButton}
                                    onClick={() => setShowBonusInfo(prev => !prev)}>
                                <QuestionIcon/>
                                <span>Как это работает</span>
                            </button>
                            )}
                            {FEATURES.loyalty && showBonusInfo && (
                                <p className={styles.bonusInfo}>
                                    За каждый заказ начисляем {BONUS_ACCRUAL_RATE * 100}% от оплаченной суммы товаров
                                    бонусными баллами. 1 балл = 1 ₽, баллами можно оплатить следующие покупки при
                                    оформлении заказа.
                                </p>
                            )}
                        </div>
                    </div>

                    <LinksCard title="Покупки" links={PURCHASE_LINKS} />
                    <LinksCard ariaLabel="Списки" links={LIST_LINKS} centered />
                </div>

                <Button variant="outline" className={styles.logoutButton} onClick={handleLogout} fullWidth>
                    Выйти из профиля
                </Button>
            </div>

            {isEditing && <ProfileEditForm profile={profile} onClose={() => setIsEditing(false)}/>}
        </div>
    );
};
