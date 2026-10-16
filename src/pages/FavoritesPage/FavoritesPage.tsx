import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFavoritesItems, clearFavorites } from '@/store/slices/favorites';
import { addToCart } from '@/store/slices/cart/cart.slice';
import { ProductList } from '@/components/product/ProductList';
import { Checkbox } from '@/components/common/Checkbox';
import { EmptyState } from '@/components/common/EmptyState';
import { toCartItem } from '@/utils/cart';
import { useSelection } from '@/hooks/useSelection';
import { TrashIcon } from '@/components/common/icons';
import styles from './FavoritesPage.module.css';

export const FavoritesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavoritesItems);

  const favoriteIds = useMemo(() => favorites.map(p => p.id), [favorites]);
  const {
    selectedIds,
    allSelected,
    toggleAll: handleToggleAll,
    toggleOne: handleToggleOne,
    clear: clearSelection,
  } = useSelection({ itemIds: favoriteIds });

  const handleAddSelectedToCart = () => {
    favorites
        .filter((p) => p.inStock && selectedIds.includes(p.id))
        .forEach((product) => dispatch(addToCart(toCartItem(product, 1))));
    clearSelection();
  };

  const handleClearAll = () => {
    dispatch(clearFavorites());
    clearSelection();
  };

  const bulkActions = (
      <>
        <button
            type="button"
            className={`${styles.toolbarBtn} ${styles.toolbarBtnCart}`}
            onClick={handleAddSelectedToCart}
            disabled={selectedIds.length === 0}
        >
          <span className={styles.toolbarIcon}>
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M5.25 1.75L2.625 5.25V17.5C2.625 17.9641 2.80937 18.4092 3.13756 18.7374C3.46575 19.0656 3.91087 19.25 4.375 19.25H16.625C17.0891 19.25 17.5342 19.0656 17.8624 18.7374C18.1906 18.4092 18.375 17.9641 18.375 17.5V5.25L15.75 1.75H5.25Z"
    stroke="#A4AFB7" strokeWidth="1.2"/>
<path d="M2.625 5.25H18.375" stroke="#A4AFB7" strokeWidth="1.2"/>
<path
    d="M14 8.75C14 9.67826 13.6313 10.5685 12.9749 11.2249C12.3185 11.8813 11.4283 12.25 10.5 12.25C9.57174 12.25 8.6815 11.8813 8.02513 11.2249C7.36875 10.5685 7 9.67826 7 8.75"
    stroke="#A4AFB7" strokeWidth="1.2"/>
</svg>

          </span>
          Добавить отмеченные в корзину
        </button>

        <button
            type="button"
            className={styles.toolbarBtn}
            onClick={handleClearAll}
        >
          <span className={styles.toolbarIcon}>
            <TrashIcon />
</span>
          Очистить все
        </button>
      </>
  );

  if (favorites.length === 0) {
    return (
        <EmptyState
            icon={
              <svg width="61" height="55" viewBox="0 0 61 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M55.7738 5.17444C54.3078 3.66095 52.5671 2.46034 50.6512 1.6412C48.7353 0.822063 46.6819 0.400452 44.608 0.400452C42.5342 0.400452 40.4807 0.822063 38.5648 1.6412C36.649 2.46034 34.9083 3.66095 33.4422 5.17444L30.3996 8.31401L27.357 5.17444C24.3957 2.11872 20.3792 0.402036 16.1912 0.402036C12.0032 0.402036 7.98677 2.11872 5.02542 5.17444C2.06406 8.23017 0.400391 12.3746 0.400391 16.6961C0.400391 21.0175 2.06406 25.1619 5.02542 28.2177L8.06802 31.3572L30.3996 54.4005L52.7312 31.3572L55.7738 28.2177C57.2406 26.7049 58.4041 24.9087 59.198 22.9318C59.9918 20.9549 60.4004 18.836 60.4004 16.6961C60.4004 14.5562 59.9918 12.4372 59.198 10.4603C58.4041 8.48338 57.2406 6.68723 55.7738 5.17444Z"
                    fill="#FF6900" stroke="#FF6900" strokeWidth="0.800906"/>
              </svg>
            }
            title={
              <>
                Нажимайте{' '}
                <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.6" d="M16.2888 1.92608C15.8734 1.50567 15.3802 1.17217 14.8373 0.944628C14.2945 0.71709 13.7127 0.599976 13.1251 0.599976C12.5375 0.599976 11.9557 0.71709 11.4129 0.944628C10.87 1.17217 10.3769 1.50567 9.96147 1.92608L9.09939 2.79819L8.23732 1.92608C7.39827 1.07727 6.26027 0.600416 5.07368 0.600416C3.88708 0.600416 2.74908 1.07727 1.91003 1.92608C1.07098 2.7749 0.599609 3.92613 0.599609 5.12653C0.599609 6.32693 1.07098 7.47817 1.91003 8.32698L2.77211 9.19908L9.09939 15.6L15.4267 9.19908L16.2888 8.32698C16.7043 7.90676 17.034 7.40783 17.2589 6.85869C17.4838 6.30954 17.5996 5.72095 17.5996 5.12653C17.5996 4.53211 17.4838 3.94352 17.2589 3.39438C17.034 2.84523 16.7043 2.3463 16.2888 1.92608Z" stroke="#A4AFB7" strokeWidth="1.2"/>
                </svg>
                {' '}
                на карточках
              </>
            }
            description="товаров и добавляйте их в список избранного."
        />
    );
  }

  return (
      <div className={styles.favoritesPage}>
        <div className="container">
          <h1 className={styles.title}>Избранное</h1>

          <div className={styles.toolbar}>
            <Checkbox
                checked={allSelected}
                onChange={handleToggleAll}
                label="Выбрать все"
                size="md"
            />

            <div className={styles.toolbarActions}>{bulkActions}</div>
          </div>

          <ProductList
              products={favorites}
              viewMode="list"
              selectable
              selectedIds={selectedIds}
              onToggleSelect={handleToggleOne}
              emptyMessage="В избранном пока нет товаров"
          />

          <div className={styles.bottomActions}>{bulkActions}</div>
        </div>
      </div>
  );
};
