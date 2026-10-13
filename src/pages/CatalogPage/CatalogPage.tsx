import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { useAllCategories } from '@/hooks/useCategories';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EntityHeader } from '@/components/catalog/EntityHeader';
import { CategoryCardWithGroups } from '@/components/catalog/CategoryCardWithGroups';
import styles from './CatalogPage.module.css';
import { ProductSlider } from '@/components/product/ProductSlider';
import { SectionBlock } from '@/components/common/SectionBlock';
import { selectHitProducts } from '@/store/slices/products';

export const CatalogPage: React.FC = () => {
    const { categories, isLoading } = useAllCategories();

    const hitProducts = useAppSelector(selectHitProducts);

    if (isLoading) return <div className={styles.loading}>Загрузка...</div>;

    return (
        <div className="page">
            <Breadcrumbs />
            <EntityHeader title="Каталог товаров" />
            <div className={styles.categoriesGrid}>
                {categories.map(c => (
                    <CategoryCardWithGroups key={c.id} category={c} previewLimit={6} />
                ))}
            </div>

            <SectionBlock
                accent="Бренды"
                title="Только оригинальные бренды"
                description="Актуальные товары для вашего ремонта — то, что сейчас чаще всего выбирают наши покупатели. Обновляем подборку каждую неделю!"
                linkText="Подробнее о компании"
                className={styles.SectionBrand}
            >
            </SectionBlock>

            <SectionBlock
                accent="Советуем купить"
                title="Часто покупают сейчас"
                description="Актуальные товары для вашего ремонта — то, что сейчас чаще всего выбирают наши покупатели. Обновляем подборку каждую неделю!"
                linkText="Смотреть всю подборку "
                linkHref="/catalog"
                className={styles.SectionBlock}
            >
                {hitProducts.length > 0 && (
                    <ProductSlider products={hitProducts} slidesPerView={4} />
                )}
            </SectionBlock>
        </div>
    );
};
