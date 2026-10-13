import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectHitProducts } from '@/store/slices/products';
import { ProductSlider } from '@/components/product/ProductSlider';
import { SectionBlock } from '@/components/common/SectionBlock';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Button } from '@/components/common/Button';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: React.ReactNode;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
                                                          icon,
                                                          title,
                                                          description,
                                                          buttonText = 'Перейти в каталог',
                                                          buttonHref = '/catalog',
                                                          className,
                                                      }) => {
    const hitProducts = useAppSelector(selectHitProducts);

    return (
        <div className={styles.emptyPage}>
            <Breadcrumbs/>

            <div className={[styles.empty, className].filter(Boolean).join(' ')}>
                <div className="container">
                    <div className={styles.emptyContent}>
                        {icon && <div className={styles.emptyIcon}>{icon}</div>}
                        <p className={styles.emptyTitle}>{title}</p>
                        {description && (
                            <p className={styles.emptyDescription}>{description}</p>
                        )}
                        <Button to={buttonHref} variant="yellow" className={styles.emptyButton}>
                            {buttonText}
                        </Button>
                    </div>
                </div>
            </div>

            <SectionBlock
                accent="Недавно вы смотрели"
                title="Ещё не решили?"
                description="Товары, которые вас заинтересовали, — вернитесь к ним за один клик."
                linkText="Смотреть всю подборку "
                linkHref="/catalog"
            >
                {hitProducts.length > 0 && (
                    <ProductSlider products={hitProducts} slidesPerView={4}/>
                )}
            </SectionBlock>
        </div>
    );
};
