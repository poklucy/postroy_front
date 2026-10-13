import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart, selectCartItems } from '@/store/slices/cart';
import {
    addAddress,
    addOrder,
    selectIsAuthenticated,
    selectUserOrders,
    selectUserProfile,
    updateProfile,
} from '@/store/slices/auth';
import { setLastOrder } from '@/store/slices/checkout';
import { PICKUP_POINTS, PROMO_CODES, PromoCode } from '@/api/mockData/checkout';
import { LoginModal } from '@/components/auth/LoginModal';
import { BackLink } from '@/components/common/BackLink';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ROUTES } from '@/config/routes.config';
import { DeliveryMethod, Order } from '@/types/order.types';
import { delay, generateId } from '@/utils/helpers';
import { formatPhoneInput, normalizePhone } from '@/utils/phone';
import { OrderItems } from './components/OrderItems';
import { DeliverySection } from './components/DeliverySection';
import { ContactsSection } from './components/ContactsSection';
import { CheckoutSummary } from './components/CheckoutSummary';
import {
    calculateTotals,
    CheckoutContacts,
    CheckoutErrors,
    validateCheckout,
} from './checkout.utils';
import styles from './CheckoutPage.module.css';

export const CheckoutPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const items = useAppSelector(selectCartItems);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const profile = useAppSelector(selectUserProfile);
    const orders = useAppSelector(selectUserOrders);

    const [method, setMethod] = useState<DeliveryMethod>('courier');
    const [addressId, setAddressId] = useState('');
    const [pickupPointId, setPickupPointId] = useState(PICKUP_POINTS[0].id);
    const [services, setServices] = useState<string[]>([]);
    const [comment, setComment] = useState('');
    const [contacts, setContacts] = useState<CheckoutContacts>({ firstName: '', lastName: '', phone: '', email: '' });
    const [promo, setPromo] = useState<PromoCode | null>(null);
    const [promoError, setPromoError] = useState('');
    const [useBonus, setUseBonus] = useState(false);
    const [consent, setConsent] = useState(true);
    const [errors, setErrors] = useState<CheckoutErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isCompleted = useRef(false);

    const addresses = useMemo(() => profile?.addresses ?? [], [profile]);
    const bonusAvailable = profile?.bonusPoints ?? 0;

    useEffect(() => {
        if (!profile) return;
        setContacts(prev => ({
            firstName: prev.firstName || profile.firstName,
            lastName: prev.lastName || profile.lastName,
            phone: prev.phone || formatPhoneInput(profile.phone),
            email: prev.email || profile.email,
        }));
    }, [profile]);

    useEffect(() => {
        if (addresses.length > 0 && !addresses.some(a => a.id === addressId)) {
            setAddressId(addresses[addresses.length - 1].id);
        }
    }, [addresses, addressId]);

    const totals = useMemo(
        () => calculateTotals({ items, deliveryMethod: method, promo, useBonus, bonusAvailable }),
        [items, method, promo, useBonus, bonusAvailable]
    );

    if (items.length === 0 && !isCompleted.current) {
        return <Navigate to={ROUTES.CART} replace />;
    }

    if (!isAuthenticated) {
        return <LoginModal isOpen onClose={() => navigate(ROUTES.CART)} />;
    }

    const selectedAddress = addresses.find(a => a.id === addressId)?.value ?? '';
    const pickupPoint = PICKUP_POINTS.find(p => p.id === pickupPointId);
    const deliveryAddress = method === 'courier' ? selectedAddress : pickupPoint?.name ?? '';

    const handleContactChange = (field: keyof CheckoutContacts, value: string) => {
        setContacts(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleAddAddress = (value: string) => {
        dispatch(addAddress(value));
        setErrors(prev => ({ ...prev, address: undefined }));
    };

    const handleToggleService = (service: string) => {
        setServices(prev => (prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]));
    };

    const handleApplyPromo = (code: string) => {
        const found = PROMO_CODES.find(p => p.code === code.trim().toUpperCase());
        if (!found) {
            setPromoError('Промокод не найден');
        } else if (found.firstOrderOnly && orders.length > 0) {
            setPromoError('Промокод действует только на первый заказ');
        } else {
            setPromo(found);
            setPromoError('');
        }
    };

    const handleConsentChange = (value: boolean) => {
        setConsent(value);
        setErrors(prev => ({ ...prev, consent: undefined }));
    };

    const handleSubmit = async () => {
        const validationErrors = validateCheckout(contacts, deliveryAddress, consent);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);
        await delay(800);

        const order: Order = {
            id: generateId(),
            orderNumber: String(Date.now()).slice(-8),
            items: items.map(item => ({
                productId: item.productId,
                article: item.article,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
            })),
            contacts: {
                firstName: contacts.firstName.trim(),
                lastName: contacts.lastName.trim(),
                phone: normalizePhone(contacts.phone),
                email: contacts.email.trim(),
            },
            delivery: {
                method,
                address: deliveryAddress,
                services: method === 'courier' ? services : [],
                comment: comment.trim(),
                price: totals.deliveryPrice,
            },
            itemsTotal: totals.itemsTotal,
            promoCode: promo?.code,
            promoDiscount: totals.promoDiscount,
            bonusSpent: totals.bonusSpent,
            bonusEarned: totals.bonusEarned,
            totalPrice: totals.totalPrice,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };

        isCompleted.current = true;
        dispatch(updateProfile({
            firstName: order.contacts.firstName,
            lastName: order.contacts.lastName,
            email: order.contacts.email,
        }));
        dispatch(addOrder(order));
        dispatch(setLastOrder(order));
        dispatch(clearCart());
        navigate(ROUTES.ORDER_SUCCESS, { replace: true });
    };

    const hasErrors = Object.values(errors).some(Boolean);

    return (
        <div className={`page ${styles.checkoutPage}`}>
            <Breadcrumbs />

            <div className={styles.header}>
                <h1>Оформление заказа</h1>
                <BackLink to={ROUTES.CART}>Вернуться в корзину</BackLink>
            </div>

            <p className={styles.stepTitle}>Шаг 1 — заполните данные и выберите доставку</p>

            <div className={styles.layout}>
                <div className={styles.main}>
                    <OrderItems items={items} />
                    <DeliverySection
                        method={method}
                        onMethodChange={setMethod}
                        addresses={addresses}
                        addressId={addressId}
                        onAddressChange={(id) => {
                            setAddressId(id);
                            setErrors(prev => ({ ...prev, address: undefined }));
                        }}
                        onAddAddress={handleAddAddress}
                        pickupPointId={pickupPointId}
                        onPickupPointChange={setPickupPointId}
                        services={services}
                        onToggleService={handleToggleService}
                        comment={comment}
                        onCommentChange={setComment}
                        error={errors.address}
                    />
                    <ContactsSection contacts={contacts} errors={errors} onChange={handleContactChange} />
                </div>

                <CheckoutSummary
                    positionsCount={items.length}
                    totals={totals}
                    promo={promo}
                    promoError={promoError}
                    onApplyPromo={handleApplyPromo}
                    onResetPromo={() => setPromo(null)}
                    bonusAvailable={bonusAvailable}
                    useBonus={useBonus}
                    onUseBonusChange={setUseBonus}
                    consent={consent}
                    onConsentChange={handleConsentChange}
                    consentError={errors.consent}
                    formError={hasErrors ? 'Проверьте правильность заполнения полей' : ''}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};
