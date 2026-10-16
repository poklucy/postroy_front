import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCartItems,
  selectCartTotalPrice,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '@/store/slices/cart';
import { Checkbox } from '@/components/common/Checkbox';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { CartSummary } from '@/components/cart/CartSummary';
import { useSelection } from '@/hooks/useSelection';
import { TrashIcon } from '@/components/common/icons';
import { BONUS_ACCRUAL_RATE } from '@/api/mockData/checkout';
import { FEATURES } from '@/config/features.config';
import styles from './CartPage.module.css';
import { EmptyState } from '@/components/common/EmptyState';

export const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const itemIds = useMemo(() => items.map(item => item.productId), [items]);

  const { selectedIds, allSelected, toggleAll, toggleOne, clear } = useSelection({ itemIds });

  const handleRemove = (id: string) => dispatch(removeFromCart(id));

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId: id, quantity }));
  };

  const handleClear = () => {
    dispatch(clearCart());
    clear();
  };

  return (
      <div className={`${styles.cartPage} container`}>

        <div className={styles.cartContainer}>
          <div className={styles.cartMain}>

            {items.length === 0 ? (
                <EmptyState
                    icon={
                      <svg width="90" height="82" viewBox="0 0 90 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M23.6111 3.82617L12.5 18.9142V71.7222C12.5 73.723 13.2804 75.6418 14.6696 77.0566C16.0587 78.4714 17.9428 79.2662 19.9074 79.2662H71.7593C73.7238 79.2662 75.6079 78.4714 76.9971 77.0566C78.3862 75.6418 79.1667 73.723 79.1667 71.7222V18.9142L68.0556 3.82617H23.6111Z"
                            fill="#FF6900"/>
                        <path d="M12.5 20.2261H79.1667" stroke="white" strokeWidth="1.2"/>
                        <path
                            d="M59.166 33.3461C59.166 37.6957 57.5857 41.8671 54.7726 44.9427C51.9596 48.0183 48.1443 49.7461 44.166 49.7461C40.1878 49.7461 36.3725 48.0183 33.5594 44.9427C30.7464 41.8671 29.166 37.6957 29.166 33.3461"
                            stroke="white" strokeWidth="1.2"/>
                      </svg>

                    }
                    title="В корзине пусто."
                    description="Чтобы добавить товары в корзину воспользуйтесь поиском или каталогом."
                />
            ) : (
                <>
                  <div className={styles.cart}>
                    <div className={styles.toolbar}>
                      <Checkbox checked={allSelected} onChange={toggleAll} label="Выбрать все"/>
                      <button className={styles.toolbarBtn} type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd"
                                d="M18.8 8.2H16V7H19.001C19.551 7 20 7.446 20 7.996V21.004C19.9989 21.2678 19.8937 21.5206 19.7071 21.7071C19.5206 21.8937 19.2678 21.9989 19.004 22H4.996C4.73217 21.9989 4.47944 21.8937 4.29289 21.7071C4.10633 21.5206 4.00105 21.2678 4 21.004V7.996C4.00106 7.73165 4.10674 7.47847 4.29395 7.29183C4.48115 7.10518 4.73465 7.00026 4.999 7H8V8.2H5.2V20.8H18.8V8.2ZM12.6 4.262V13.5H11.4V4.262L9.313 6.349L8.464 5.5L11.293 2.672C11.4805 2.48453 11.7348 2.37921 12 2.37921C12.2652 2.37921 12.5195 2.48453 12.707 2.672L15.536 5.5L14.687 6.349L12.6 4.262Z"
                                fill="#A4AFB7"/>
                        </svg>

                        <span>Поделиться<span className={styles.desktopOnly}> корзиной</span></span>
                      </button>
                      <button className={styles.toolbarBtn} type="button" onClick={handleClear}>
                        <TrashIcon />
Очистить корзину
                      </button>
                    </div>

                    <div className={styles.cartLayout}>
                      <div className={styles.itemsList}>
                        {items.map((item) => (
                            <CartItemRow
                                key={item.productId}
                                item={item}
                                selected={selectedIds.includes(item.productId)}
                                onSelectChange={toggleOne}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemove}
                            />
                        ))}
                      </div>

                      <CartSummary
                          positionsCount={items.length}
                          totalPrice={totalPrice}
                          weight={40}
                          bonusPoints={FEATURES.loyalty ? Math.floor(totalPrice * BONUS_ACCRUAL_RATE) : undefined}
                          onCheckout={() => navigate('/checkout')}
                      />
                    </div>
                  </div>
                </>
            )}

          </div>
        </div>
      </div>
  );
};
