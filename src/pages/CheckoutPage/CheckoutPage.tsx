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
import { DeliveryMethod, Order, PaymentMethod } from '@/types/order.types';
import { AVAILABLE_DELIVERY_METHODS, AVAILABLE_PAYMENT_METHODS } from '@/config/checkout.config';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { generateId } from '@/utils/helpers';
import { ordersApi } from '@/api/orders.api';
import { toRequestError } from '@/api/apiError';
import { STATUS_MESSAGES, getInlineErrorMessage } from '@/config/statusMessages';
import { formatPhoneInput, normalizePhone } from '@/utils/phone';
import { OrderItems } from './components/OrderItems';
import { DeliverySection } from './components/DeliverySection';
import { ContactsSection } from './components/ContactsSection';
import { CheckoutSummary } from './components/CheckoutSummary';
import { CheckoutActions } from './components/CheckoutActions';
import { PaymentStep } from './components/PaymentStep';
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
    const cartItems = useAppSelector(selectCartItems);
    const items = useMemo(() => cartItems.filter(item => item.inStock !== false), [cartItems]);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const profile = useAppSelector(selectUserProfile);
    const orders = useAppSelector(selectUserOrders);

    const [step, setStep] = useState<1 | 2>(1);
    const [method, setMethod] = useState<DeliveryMethod>(AVAILABLE_DELIVERY_METHODS[0].value);
    const [payment, setPayment] = useState<PaymentMethod>(AVAILABLE_PAYMENT_METHODS[0].value);
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
    const [submitError, setSubmitError] = useState('');
    const isCompleted = useRef(false);
    const isCompact = useMediaQuery('(max-width: 992px)');

    const addresses = useMemo(() => profile?.addresses ?? [], [profile]);
    const bonusAvailable = profile?.bonusPoints ?? 0;

    const contactsPrefilled = useRef(false);

    useEffect(() => {
        if (!profile || contactsPrefilled.current) return;
        contactsPrefilled.current = true;
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
            setPromoError(STATUS_MESSAGES.checkout.promoNotFound);
        } else if (found.firstOrderOnly && orders.length > 0) {
            setPromoError(STATUS_MESSAGES.checkout.promoFirstOrderOnly);
        } else {
            setPromo(found);
            setPromoError('');
        }
    };

    const handleConsentChange = (value: boolean) => {
        setConsent(value);
        setErrors(prev => ({ ...prev, consent: undefined }));
    };

    const handleGoToPayment = () => {
        const validationErrors = validateCheckout(contacts, deliveryAddress, consent);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setSubmitError('');
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handleBackToDetails = () => {
        setStep(1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError('');

        const draft: Order = {
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
            payment,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };

        let order: Order;
        try {
            order = await ordersApi.place(draft);
        } catch (error) {
            setSubmitError(getInlineErrorMessage(toRequestError(error), STATUS_MESSAGES.checkout.submitError));
            setIsSubmitting(false);
            return;
        }

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

    const header = (
        <div className={styles.header}>
            <h1>Оформление заказа</h1>
            {step === 1 && <BackLink to={ROUTES.CART}>Вернуться в корзину</BackLink>}
        </div>
    );

    if (step === 2) {
        return (
            <div className={`page ${styles.checkoutPage}`}>
                <Breadcrumbs />
                {header}
                <PaymentStep
                    value={payment}
                    onChange={setPayment}
                    onBack={handleBackToDetails}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    error={submitError}
                />
            </div>
        );
    }

    const actions = (
        <CheckoutActions
            className={isCompact ? styles.actionsStandalone : undefined}
            consent={consent}
            onConsentChange={handleConsentChange}
            consentError={errors.consent}
            formError={hasErrors ? STATUS_MESSAGES.checkout.validation : ''}
            isSubmitting={false}
            onSubmit={handleGoToPayment}
        />
    );

    const summary = (
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
            actions={isCompact ? undefined : actions}
        />
    );

    return (
        <div className={`page ${styles.checkoutPage}`}>
            <Breadcrumbs />

            {header}

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
                    {isCompact && summary}
                    <ContactsSection contacts={contacts} errors={errors} onChange={handleContactChange} />
                    {isCompact && actions}
                </div>

                {!isCompact && summary}
            </div>
        </div>
    );
};
