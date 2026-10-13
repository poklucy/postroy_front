import { ProductCard } from '@/types/product.types';

const VIEWED_KEY = 'postroy_viewed_products';
const VIEWED_LIMIT = 20;

export const getViewedProducts = (): ProductCard[] => {
  try {
    const raw = localStorage.getItem(VIEWED_KEY);
    return raw ? (JSON.parse(raw) as ProductCard[]) : [];
  } catch {
    return [];
  }
};

export const addViewedProduct = (product: ProductCard) => {
  const viewed = [product, ...getViewedProducts().filter(p => p.id !== product.id)].slice(0, VIEWED_LIMIT);
  try {
    localStorage.setItem(VIEWED_KEY, JSON.stringify(viewed));
  } catch (error) {
    console.error('Не удалось сохранить историю просмотров', error);
  }
};
