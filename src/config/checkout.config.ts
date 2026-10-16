import { DeliveryMethod, PaymentMethod } from '@/types/order.types';

export interface DeliveryMethodOption {
    value: DeliveryMethod;
    label: string;
    enabled: boolean;
}

export interface PaymentMethodOption {
    value: PaymentMethod;
    label: string;
    enabled: boolean;
}

export const DELIVERY_METHODS: DeliveryMethodOption[] = [
    { value: 'pickup', label: 'Самовывоз', enabled: true },
    { value: 'courier', label: 'Курьер', enabled: false },
];

export const PAYMENT_METHODS: PaymentMethodOption[] = [
    { value: 'store', label: 'Оплата в магазине', enabled: false },
    { value: 'card', label: 'Банковской картой онлайн', enabled: false },
    { value: 'cash', label: 'Наличными при получении', enabled: true },
    { value: 'sbp', label: 'Оплата по СБП', enabled: false },
];

export const AVAILABLE_DELIVERY_METHODS = DELIVERY_METHODS.filter(method => method.enabled);
export const AVAILABLE_PAYMENT_METHODS = PAYMENT_METHODS.filter(method => method.enabled);
