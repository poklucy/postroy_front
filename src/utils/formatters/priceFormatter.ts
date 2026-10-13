export const formatPrice = (price?: number | null, currency: string = '₽'): string => {
  if (price == null || Number.isNaN(price)) return '';
  return price.toLocaleString('ru-RU').replace(/\u00A0/g, ' ') + ' ' + currency;
};
