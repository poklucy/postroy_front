export interface PromoCode {
  code: string;
  percent: number;
  description: string;
  firstOrderOnly?: boolean;
}

export const PROMO_CODES: PromoCode[] = [
  { code: 'XL34PO-LEG78', percent: 5, description: '5% на первый заказ', firstOrderOnly: true },
];

export const PICKUP_POINTS = [
  { id: 'taganka', name: 'Магазин на Таганке', schedule: 'Пн-Вс: 8.00-20.00' },
  { id: 'vyatskaya', name: 'Магазин на Вятской', schedule: 'Пн-Вс: 8.00-20.00' },
];

export const DELIVERY_SERVICES = [
  'Транспорт с манипулятором',
  'Потребуется грузчик',
  'Ограничение проезда по высоте (3 м или менее)',
  'Обязательно предварительный звонок оператора',
];

export const COURIER_COMMENT_TAGS = ['#Оставить у двери', '#Узкая дорога', '#Шлагбаум'];

export const COURIER_DELIVERY_PRICE = 1400;

export const BONUS_ACCRUAL_RATE = 0.01;
