import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper } from '@/components/common/Swiper';
import { Category } from '@/types/category.types';
import { buildCategoryUrl } from '@/config/routes.config';
import styles from './CategorySlider.module.css';
import { CategoryImage } from '@/components/category/CategoryImage';

interface CategorySliderProps {
    categories: Category[];
    title?: string;
    slidesPerView?: number;
    autoplay?: boolean;
}

export const CategorySlider: React.FC<CategorySliderProps> = ({
                                                                  categories,
                                                                  title,
                                                                  slidesPerView = 5,
                                                                  autoplay = false,
                                                              }) => {
    if (categories.length === 0) {
        return null;
    }

    const renderCard = (category: Category) => (
        <Link
            key={category.id}
            to={buildCategoryUrl(category.slug)}
            className={styles.categoryCard}
        >
            <div className={styles.categoryImage}>
                <CategoryImage category={category} iconClassName={styles.categoryIcon} />
            </div>
            <h3 className={styles.categoryName}>{category.name}</h3>
        </Link>
    );

    return (
        <div className={styles.categorySlider}>
            {title && <h3 className={styles.title}>{title}</h3>}
            <div className={styles.mobileGrid}>
                {categories.map(renderCard)}
            </div>
            <div className={styles.desktopSlider}>
                <Swiper
                    slidesPerView={slidesPerView}
                    spaceBetween={16}
                    navigation={true}
                    pagination={true}
                    autoplay={autoplay}
                    breakpoints={{
                        320: { slidesPerView: 1.2, spaceBetween: 10 },
                        480: { slidesPerView: 2, spaceBetween: 10 },
                        768: { slidesPerView: 3, spaceBetween: 10 },
                        1024: { slidesPerView: slidesPerView || 5, spaceBetween: 10 },
                    }}
                >
                    {categories.map(renderCard)}
                </Swiper>
            </div>
        </div>
    );
};
