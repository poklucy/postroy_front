import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchProductBySlug,
  fetchRelatedProducts,
  selectHitProducts,
  selectCurrentProduct,
  selectRelatedProducts,
  selectProductRequest,
  mapToProductCard,
} from '@/store/slices/products';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FavoriteButton } from '@/components/common/FavoriteButton';
import { CompareButton } from '@/components/common/CompareButton';
import { ProductSlider } from '@/components/product/ProductSlider';
import { SectionBlock } from '@/components/common/SectionBlock';
import { addViewedProduct } from '@/utils/viewedProducts';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { StatusMessage } from '@/components/common/StatusMessage';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ProductDetailSkeleton } from './components/ProductDetailSkeleton';
import { ProductGallery } from './components/ProductGallery';
import { ProductOptions } from './components/ProductOptions';
import { ProductSpecs } from './components/ProductSpecs';
import { ProductDocs } from './components/ProductDocs';
import { ProductBuyCard } from './components/ProductBuyCard';
import { ProductSections } from './components/ProductSections';
import styles from './ProductDetailPage.module.css';

type TabKey = 'description' | 'specs' | 'docs' | 'questions';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'description', label: 'Описание' },
  { key: 'specs', label: 'Характеристики' },
  { key: 'docs', label: 'Документы' },
  { key: 'questions', label: 'Вопросы' },
];

export const ProductDetailPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();

  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const product = useAppSelector(selectCurrentProduct);
  useAppSelector(selectRelatedProducts);
  const productRequest = useAppSelector(selectProductRequest);
  const hitProducts = useAppSelector(selectHitProducts);

  const loadProduct = useCallback(() => {
    if (productSlug) dispatch(fetchProductBySlug(productSlug));
  }, [productSlug, dispatch]);

  useEffect(loadProduct, [loadProduct]);

  useEffect(() => {
    if (product && product.slug === productSlug) {
      addViewedProduct(mapToProductCard(product));
    }
  }, [product, productSlug]);

  useEffect(() => {
    if (product?.id) {
      dispatch(fetchRelatedProducts({ productId: String(product.id), limit: 4 }));
    }
  }, [product?.id, dispatch]);

  const isCurrent = Boolean(product) && product!.slug === productSlug;
  const requestError = productRequest.slug === productSlug && productRequest.status === 'failed'
      ? productRequest.error
      : null;

  if (!isCurrent && requestError?.kind === 'not_found') {
    return <NotFoundPage {...STATUS_MESSAGES.product.notFound} />;
  }

  if (!isCurrent && requestError) {
    return (
        <div className="page">
          <Breadcrumbs />
          <StatusMessage
              className={styles.status}
              error={requestError}
              text={STATUS_MESSAGES.product.error}
              onRetry={loadProduct}
          />
        </div>
    );
  }

  if (!product || !isCurrent) return <ProductDetailSkeleton />;

  const productCard = mapToProductCard(product);
  const questionsPlaceholder = <p className={styles.placeholder}>Вопросов пока нет</p>;

  const relatedSection = (
      <SectionBlock
          accent="Может пригодиться"
          title="Часто покупают вместе"
          mobileTitle="Покупают вместе"
          compactOnMobile
          description="Мы подобрали товары, которые могут вам пригодиться."
      >
        {hitProducts.length > 0 && (
            <ProductSlider products={hitProducts} slidesPerView={4} />
        )}
      </SectionBlock>
  );

  const header = (
      <>
        <Breadcrumbs />

        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.metaRow}>
          <span className={styles.article}>Арт. {product.article}</span>

          <CompareButton product={productCard} label="В список сравнения" />
          <FavoriteButton product={productCard} label="Добавить в избранное" />
        </div>
      </>
  );

  if (isMobile) {
    return (
        <div className={`page ${styles.mobilePage}`}>
          {header}
          <ProductGallery product={productCard} variant="mobile" />
          <ProductOptions />
          <ProductBuyCard product={product} />
          <ProductSections
              sections={[
                { key: 'description', title: 'Описание', content: <p className={styles.descriptionText}>{product.description}</p> },
                { key: 'specs', title: 'Характеристики', content: <ProductSpecs specifications={product.specifications} /> },
                { key: 'docs', title: 'Документы', content: <ProductDocs product={product} /> },
                { key: 'questions', title: 'Вопросы', content: questionsPlaceholder },
              ]}
          />
          {relatedSection}
        </div>
    );
  }

  return (
      <div className="page">
        {header}

        <div className={styles.productLayout}>
          <div className={styles.leftCol}>

            <div className={styles.tabs}>
              {TABS.map(tab => (
                  <button
                      key={tab.key}
                      className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                      onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
              ))}
            </div>

            <div className={styles.tabBody}>
              <div className={styles.mainInfoProduct}>
                {activeTab === 'description' && (
                    <div className={styles.description}>
                      <ProductGallery product={productCard} />
                      <div className={styles.descriptionGrid}>
                        <p className={styles.descriptionText}>
                          {product.description}
                        </p>
                        <ProductOptions />
                      </div>
                    </div>
                )}
              </div>

              {activeTab === 'specs' && <ProductSpecs specifications={product.specifications} />}
              {activeTab === 'docs' && <ProductDocs product={product} />}
              {activeTab === 'questions' && questionsPlaceholder}
            </div>
          </div>

          <ProductBuyCard product={product} />
        </div>

        {relatedSection}
      </div>
  );
};
