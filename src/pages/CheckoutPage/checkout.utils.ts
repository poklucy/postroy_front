import { FEATURES } from '@/config/features.config';
import { BONUS_ACCRUAL_RATE, COURIER_DELIVERY_PRICE, PromoCode } from '@/api/mockData/checkout';
import { CartItem } from '@/store/slices/cart';
import { DeliveryMethod } from '@/types/order.types';
import { isPhoneComplete } from '@/utils/phone';

export interface CheckoutContacts {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutContacts | 'address' | 'consent', string>>;

interface TotalsParams {
    items: CartItem[];
    deliveryMethod: DeliveryMethod;
    promo: PromoCode | null;
    useBonus: boolean;
    bonusAvailable: number;
}

const roundMoney = (value: number) => Math.round(value * 100) / 100;

export const calculateTotals = ({ items, deliveryMethod, promo, useBonus, bonusAvailable }: TotalsParams) => {
    const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const promoDiscount = promo ? roundMoney((itemsTotal * promo.percent) / 100) : 0;
    const afterPromo = itemsTotal - promoDiscount;
    const bonusSpent = FEATURES.loyalty && useBonus ? Math.min(bonusAvailable, Math.floor(afterPromo)) : 0;
    const deliveryPrice = deliveryMethod === 'courier' ? COURIER_DELIVERY_PRICE : 0;
    const bonusEarned = !FEATURES.loyalty ? 0 : Math.floor((afterPromo - bonusSpent) * BONUS_ACCRUAL_RATE);

    return {
        itemsTotal,
        promoDiscount,
        bonusSpent,
        deliveryPrice,
        bonusEarned,
        totalPrice: roundMoney(afterPromo - bonusSpent + deliveryPrice),
    };
};

export type CheckoutTotals = ReturnType<typeof calculateTotals>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateCheckout = (
    contacts: CheckoutContacts,
    address: string,
    consent: boolean
): CheckoutErrors => {
    const errors: CheckoutErrors = {};

    if (!contacts.firstName.trim()) errors.firstName = 'Введите имя';
    if (!contacts.lastName.trim()) errors.lastName = 'Введите фамилию';
    if (!isPhoneComplete(contacts.phone)) errors.phone = 'Введите номер телефона полностью';
    if (!EMAIL_RE.test(contacts.email.trim())) errors.email = 'Введите корректный e-mail';
    if (!address) errors.address = 'Выберите адрес';
    if (!consent) errors.consent = 'Необходимо согласие на обработку персональных данных';

    return errors;
};
