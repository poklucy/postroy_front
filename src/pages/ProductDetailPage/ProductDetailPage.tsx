import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchProductBySlug,
  fetchRelatedProducts,
  selectHitProducts,
  selectCurrentProduct,
  selectRelatedProducts,
  selectProductsLoading,
  mapToProductCard,
} from '@/store/slices/products';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FavoriteButton } from '@/components/common/FavoriteButton';
import { CompareButton } from '@/components/common/CompareButton';
import { ProductCartButton } from '@/components/product/ProductCartButton';
import { ProductBadges } from '@/components/product/ProductBadges';
import { ProductSlider } from '@/components/product/ProductSlider';
import { SectionBlock } from '@/components/common/SectionBlock';
import { formatPrice } from '@/utils';
import { addViewedProduct } from '@/utils/viewedProducts';
import styles from './ProductDetailPage.module.css';

type TabKey = 'description' | 'specs' | 'docs' | 'questions';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'description', label: 'Описание' },
  { key: 'specs', label: 'Характеристики' },
  { key: 'docs', label: 'Документы' },
  { key: 'questions', label: 'Вопросы' },
];

const VOLUMES = [30, 50, 100];

const COLORS = [
  { value: 'graphite', label: 'Графит' },
  { value: 'white', label: 'Белый' },
];

const SUPPLIES = [
  { value: 'bottom', label: 'Нижний' },
  { value: 'top', label: 'Верхний' },
];

export const ProductDetailPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();

  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const [volume, setVolume] = useState<number | null>(100);
  const [color, setColor] = useState<string>('white');
  const [supply, setSupply] = useState<string>('bottom');

  const product = useAppSelector(selectCurrentProduct);
  useAppSelector(selectRelatedProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const hitProducts = useAppSelector(selectHitProducts);

  useEffect(() => {
    if (productSlug) dispatch(fetchProductBySlug(productSlug));
    window.scrollTo(0, 0);
  }, [productSlug, dispatch]);

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

  if (isLoading) return <div className={styles.loading}>Загрузка товара...</div>;
  if (!product) return <div className={styles.notFound}>Товар не найден</div>;

  const productCard = mapToProductCard(product);

  return (
      <div className="page">
        <Breadcrumbs />

        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.metaRow}>
          <span className={styles.article}>Арт. {product.article}</span>

          <CompareButton product={productCard} label="В список сравнения" />
          <FavoriteButton product={productCard} label="Добавить в избранное" />
        </div>

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
                     <div className={styles.gallery}>
                       <div className={styles.thumbnails}>
                         {product.images && product.images.length > 1
                             ? product.images.map((img, index) => (
                                 <button
                                     key={index}
                                     className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                                     onClick={() => setSelectedImage(index)}
                                 >
                                   <img src={img} alt={`${product.name} ${index + 1}`}/>
                                 </button>
                             ))
                             : null}
                       </div>

                       <div className={styles.mainImage}>
                         <ProductBadges product={productCard} />
                         <img
                             src={product.images?.[selectedImage] || product.mainImage}
                             alt={product.name}
                         />
                       </div>
                     </div>
                     <div className={styles.descriptionGrid}>
                       <p className={styles.descriptionText}>
                         {product.description}
                       </p>

                       <div className={styles.options}>
                         <div className={styles.optionGroup}>
                           <div className={styles.optionLabel}>Объем, л</div>
                           <div className={styles.optionValues}>
                             {VOLUMES.map(v => (
                                 <button
                                     key={v}
                                     className={`${styles.optionBtn} ${volume === v ? styles.optionBtnActive : ''}`}
                                     onClick={() => setVolume(v)}
                                 >
                                   {v}
                                 </button>
                             ))}
                           </div>
                         </div>

                         <div className={styles.optionGroup}>
                           <div className={styles.optionLabel}>Цвет</div>
                           <div className={styles.optionValues}>
                             {COLORS.map(c => (
                                 <button
                                     key={c.value}
                                     className={`${styles.optionBtn} ${color === c.value ? styles.optionBtnActive : ''}`}
                                     onClick={() => setColor(c.value)}
                                 >
                                   {c.label}
                                 </button>
                             ))}
                           </div>
                         </div>

                         <div className={styles.optionGroup}>
                           <div className={styles.optionLabel}>Тип подводки</div>
                           <div className={styles.optionValues}>
                             {SUPPLIES.map(s => (
                                 <button
                                     key={s.value}
                                     className={`${styles.optionBtn} ${supply === s.value ? styles.optionBtnActive : ''}`}
                                     onClick={() => setSupply(s.value)}
                                 >
                                   {s.label}
                                 </button>
                             ))}
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
               )}
             </div>

              {activeTab === 'specs' && product.specifications?.length ? (
                  <div className={styles.specGrid}>
                    {product.specifications.map((spec, i) => (
                        <div className={styles.specRow} key={i}>
                          <span className={styles.specName}>{spec.name}</span>
                          <span className={styles.specDots} />
                          <span className={styles.specValue}>
                    {spec.value} {spec.unit || ''}
                </span>
                        </div>
                    ))}
                  </div>
              ) : null}

              {activeTab === 'docs' && (
                  <div className={styles.docsList}>
                    {product.documents?.length ? (
                        product.documents.map((doc, i) => (
                            <a
                                key={i}
                                href={doc.url}
                                className={styles.docItem}
                                download={doc.fileName || undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                    <span className={styles.docIcon}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26 18H37L26 7V18ZM12 4H28L40 16V40C40 41.0609 39.5786 42.0783 38.8284 42.8284C38.0783 43.5786 37.0609 44 36 44H12C10.9391 44 9.92172 43.5786 9.17157 42.8284C8.42143 42.0783 8 41.0609 8 40V8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM21.86 24.88C22.68 26.68 23.72 28.16 24.92 29.18L25.74 29.82C24 30.14 21.6 30.7 19.06 31.68L18.84 31.76L19.84 29.68C20.74 27.94 21.4 26.36 21.86 24.88ZM34.82 32.5C35.18 32.14 35.36 31.68 35.38 31.18C35.44 30.78 35.34 30.4 35.14 30.08C34.56 29.14 33.06 28.7 30.58 28.7L28 28.84L26.26 27.68C25 26.64 23.86 24.82 23.06 22.56L23.14 22.28C23.8 19.62 24.42 16.4 23.1 15.08C22.9385 14.9232 22.7476 14.8001 22.5381 14.7177C22.3287 14.6353 22.105 14.5953 21.88 14.6H21.4C20.66 14.6 20 15.38 19.82 16.14C19.08 18.8 19.52 20.26 20.26 22.68V22.7C19.76 24.46 19.12 26.5 18.1 28.56L16.18 32.16L14.4 33.14C12 34.64 10.86 36.32 10.64 37.38C10.56 37.76 10.6 38.1 10.74 38.46L10.8 38.56L11.76 39.18L12.64 39.4C14.26 39.4 16.1 37.5 18.58 33.26L18.94 33.12C21 32.46 23.56 32 27 31.62C29.06 32.64 31.48 33.1 33 33.1C33.88 33.1 34.48 32.88 34.82 32.5ZM34 31.08L34.18 31.3C34.16 31.5 34.1 31.52 34 31.56H33.92L33.54 31.6C32.62 31.6 31.2 31.22 29.74 30.58C29.92 30.38 30 30.38 30.2 30.38C33 30.38 33.8 30.88 34 31.08ZM15.66 34C14.36 36.38 13.18 37.7 12.28 38C12.38 37.24 13.28 35.92 14.7 34.62L15.66 34ZM21.7 20.18C21.24 18.38 21.22 16.92 21.56 16.08L21.7 15.84L22 15.94C22.34 16.42 22.38 17.06 22.18 18.14L22.12 18.46L21.8 20.1L21.7 20.18Z" fill="#EF5350"/>
                        </svg>
                    </span>
                              <span className={styles.docName}>{doc.name}</span>
                            </a>
                        ))
                    ) : (
                        <p className={styles.placeholder}>Документы появятся позже</p>
                    )}
                  </div>
              )}

              {activeTab === 'questions' && (
                  <p className={styles.placeholder}>Вопросов пока нет</p>
              )}
            </div>
          </div>

          <aside className={styles.buyCard}>
            <div className={styles.buyPriceRow}>
              <div className={styles.buyPriceLabel}>Цена за шт.</div>
              <div className={styles.buyPrice}>
                {product.oldPrice && (
                    <span className={styles.buyOldPrice}>
                                    {formatPrice(product.oldPrice)}
                                </span>
                )}
                <span className={styles.buyCurrentPrice}>
                                {formatPrice(product.price)}
                            </span>
              </div>
            </div>

            <ProductCartButton product={product} />

            <div className={styles.bonusRow}>
              Начислим баллы:{' '}
              <span className={styles.bonusValue}>+{product.bonusPoints || 0}</span>
              <span className={styles.bonusHint}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_4159_17410)">
<path
    d="M7 0C3.13437 0 0 3.13437 0 7C0 10.8656 3.13437 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13437 10.8656 0 7 0ZM7 12.8125C3.79063 12.8125 1.1875 10.2094 1.1875 7C1.1875 3.79063 3.79063 1.1875 7 1.1875C10.2094 1.1875 12.8125 3.79063 12.8125 7C12.8125 10.2094 10.2094 12.8125 7 12.8125Z"
    fill="#CCCBC7"/>
<path
    d="M8.74351 3.94795C8.27476 3.53701 7.65601 3.31201 6.99976 3.31201C6.34351 3.31201 5.72476 3.53857 5.25601 3.94795C4.76851 4.37451 4.49976 4.94795 4.49976 5.56201V5.68076C4.49976 5.74951 4.55601 5.80576 4.62476 5.80576H5.37476C5.44351 5.80576 5.49976 5.74951 5.49976 5.68076V5.56201C5.49976 4.87295 6.17319 4.31201 6.99976 4.31201C7.82632 4.31201 8.49976 4.87295 8.49976 5.56201C8.49976 6.04795 8.15601 6.49326 7.62319 6.69795C7.29194 6.82451 7.01069 7.04639 6.80913 7.33701C6.60444 7.63389 6.49819 7.99014 6.49819 8.35107V8.68701C6.49819 8.75576 6.55444 8.81201 6.62319 8.81201H7.37319C7.44194 8.81201 7.49819 8.75576 7.49819 8.68701V8.33232C7.499 8.18064 7.5455 8.03272 7.63162 7.90785C7.71775 7.78298 7.8395 7.68697 7.98101 7.63232C8.90288 7.27764 9.49819 6.46514 9.49819 5.56201C9.49976 4.94795 9.23101 4.37451 8.74351 3.94795ZM6.37476 10.437C6.37476 10.6028 6.4406 10.7617 6.55781 10.879C6.67502 10.9962 6.834 11.062 6.99976 11.062C7.16552 11.062 7.32449 10.9962 7.4417 10.879C7.55891 10.7617 7.62476 10.6028 7.62476 10.437C7.62476 10.2713 7.55891 10.1123 7.4417 9.99507C7.32449 9.87786 7.16552 9.81201 6.99976 9.81201C6.834 9.81201 6.67502 9.87786 6.55781 9.99507C6.4406 10.1123 6.37476 10.2713 6.37476 10.437Z"
    fill="#CCCBC7"/>
</g>
<defs>
<clipPath id="clip0_4159_17410">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>

              </span>
            </div>

            <div className={styles.stockRow}>
              <span className={styles.stockIcon}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M6.09961 0C9.46842 0 12.2 2.73085 12.2002 6.09961C12.2 9.46838 9.46842 12.2002 6.09961 12.2002C2.73097 12.2 0.000197902 9.46825 0 6.09961C0.000211043 2.73098 2.73098 0.000211052 6.09961 0ZM6.09961 1C3.28327 1.00021 1.00021 3.28327 1 6.09961C1.0002 8.91596 3.28326 11.2 6.09961 11.2002C8.91614 11.2002 11.2 8.91609 11.2002 6.09961C11.2 3.28314 8.91613 1 6.09961 1ZM8.14551 4.14648C8.34074 3.95125 8.65727 3.95132 8.85254 4.14648C9.04762 4.34176 9.04774 4.65831 8.85254 4.85352L5.65234 8.05371C5.4571 8.24844 5.14043 8.24863 4.94531 8.05371L3.3457 6.45312C3.1507 6.25791 3.15069 5.94131 3.3457 5.74609C3.54092 5.55109 3.85752 5.55109 4.05273 5.74609L5.29883 6.99219L8.14551 4.14648Z"
    fill="#1BB21B"/>
</svg>

              </span> в наличии
            </div>

            <div className={styles.delivery}>
              <div className={styles.deliveryRow}>
                <div className={styles.deliveryIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M15.0745 2.12416C14.6145 1.86583 14.1245 1.84083 13.607 1.905C13.1153 1.96666 12.5162 2.12166 11.797 2.30916L10.1145 2.74583C9.39532 2.93333 8.79699 3.08833 8.33949 3.27416C7.85699 3.46916 7.44032 3.73083 7.17032 4.185C6.89866 4.64166 6.87199 5.13 6.93949 5.64C7.00366 6.12083 7.16449 6.70416 7.35616 7.39916L7.80866 9.03583C8.00032 9.73166 8.16199 10.3142 8.35449 10.7608C8.55866 11.2358 8.83116 11.64 9.29449 11.9C9.75449 12.1575 10.2445 12.1833 10.7628 12.1183C11.2545 12.0575 11.8537 11.9017 12.5728 11.7142L14.2553 11.2775C14.9745 11.0908 15.5728 10.935 16.0303 10.7492C16.5128 10.5542 16.9295 10.2925 17.1995 9.83833C17.4712 9.38166 17.4978 8.89333 17.4303 8.38416C17.3662 7.90333 17.2053 7.31916 17.0137 6.62416L16.5612 4.9875C16.3695 4.2925 16.2078 3.70916 16.0153 3.2625C15.8112 2.7875 15.537 2.38333 15.0745 2.12416ZM12.0712 3.52916C12.842 3.32916 13.3612 3.19583 13.7628 3.14583C14.147 3.0975 14.3312 3.14 14.4653 3.215C14.5962 3.28833 14.722 3.41583 14.8678 3.75666C15.022 4.115 15.162 4.61416 15.3687 5.3625L15.797 6.915C16.0045 7.66333 16.1412 8.16333 16.192 8.54833C16.2403 8.91416 16.197 9.08 16.1253 9.19916C16.0528 9.32166 15.9212 9.44583 15.5628 9.59083C15.1895 9.74166 14.6712 9.87833 13.9003 10.0783L12.3003 10.4942C11.5295 10.6942 11.0103 10.8275 10.6087 10.8775C10.2237 10.9267 10.0403 10.8842 9.90616 10.8092C9.77532 10.7358 9.64949 10.6075 9.50366 10.2675C9.34949 9.90916 9.20949 9.40916 9.00282 8.66083L8.57449 7.10916C8.36699 6.35916 8.23032 5.86 8.17949 5.47583C8.13116 5.10916 8.17449 4.94416 8.24616 4.82416C8.31866 4.70166 8.45032 4.5775 8.80866 4.4325C9.18199 4.28166 9.70032 4.14583 10.4712 3.945L12.0712 3.52916Z"
                          fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M2.6664 3.93747C2.50852 3.89877 2.34177 3.92309 2.20153 4.00529C2.0613 4.08749 1.9586 4.22109 1.91523 4.37776C1.87186 4.53442 1.89124 4.70181 1.96925 4.84443C2.04726 4.98704 2.17776 5.09365 2.33307 5.14164L3.75223 5.53581C4.10723 5.63414 4.3714 5.90247 4.4614 6.22831L6.08807 12.1141C6.02529 12.1264 5.96279 12.1408 5.90057 12.1575C4.25307 12.585 3.2464 14.2425 3.69807 15.88C4.14807 17.5091 5.85973 18.4483 7.50057 18.0216C8.93723 17.6491 9.8864 16.3416 9.8064 14.9283L16.8231 13.105C16.9025 13.0843 16.9771 13.0483 17.0426 12.9988C17.1081 12.9493 17.1633 12.8875 17.2049 12.8167C17.2465 12.7459 17.2737 12.6677 17.285 12.5864C17.2964 12.5051 17.2916 12.4223 17.271 12.3429C17.2504 12.2634 17.2143 12.1888 17.1648 12.1233C17.1154 12.0578 17.0535 12.0027 16.9827 11.9611C16.9119 11.9195 16.8337 11.8923 16.7524 11.8809C16.6711 11.8696 16.5884 11.8743 16.5089 11.895L9.47723 13.7225C9.26682 13.3205 8.97075 12.9696 8.60991 12.6946C8.24907 12.4196 7.83226 12.2271 7.3889 12.1308L5.6664 5.89497C5.56045 5.51996 5.35926 5.17875 5.08239 4.90451C4.80552 4.63027 4.46241 4.43234 4.0864 4.32997L2.6664 3.93747ZM6.21557 13.3666C7.22557 13.105 8.2389 13.6908 8.4989 14.6325C8.75723 15.5658 8.19057 16.5516 7.18723 16.8125C6.17723 17.075 5.1639 16.4883 4.9039 15.5466C4.64557 14.6133 5.21223 13.6275 6.21557 13.3666Z"
                          fill="black"/>
                  </svg>

                  <span>Доставка</span>
                </div>
                <div className={styles.deliveryLine}>
                  <span>Сегодня:</span>
                  <p>4 шт</p>
                </div>
              </div>

              <div className={styles.deliveryRow}>
                <div className={styles.deliveryIcon}>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.6 5.202V2.64C1.6 2.286 1.886 2 2.24 2H15.76C16.114 2 16.4 2.286 16.4 2.64V5.202C16.734 5.222 17 5.5 17 5.84V8.474C17.0013 8.95809 16.9032 9.4373 16.712 9.882C16.626 10.086 16.52 10.278 16.4 10.46V17.36C16.4 17.712 16.114 18 15.76 18H2.24C1.886 18 1.6 17.714 1.6 17.36V10.46C1.47811 10.2775 1.37365 10.084 1.288 9.882C1.098 9.436 1 8.962 1 8.474V5.84C1 5.5 1.266 5.222 1.6 5.202ZM14.96 3.44H3.04V5.2H14.96V3.44ZM7.71999 16.562H10.28V14.48H7.71999V16.562ZM3.04 16.562H6.44V13.84C6.44 13.486 6.726 13.2 7.08 13.2H10.92C11.274 13.2 11.56 13.486 11.56 13.84V16.562H14.96V11.718C14.902 11.746 14.842 11.774 14.78 11.798C14.334 11.986 13.86 12.08 13.372 12.08C12.884 12.08 12.412 11.986 11.964 11.798C11.688 11.682 11.428 11.534 11.19 11.356C11.186 11.354 11.182 11.354 11.178 11.356C10.9393 11.5348 10.6793 11.6832 10.404 11.798C9.95799 11.986 9.48399 12.08 8.99599 12.08C8.50799 12.08 8.036 11.986 7.588 11.798C7.312 11.682 7.052 11.534 6.814 11.356C6.81 11.354 6.80599 11.354 6.802 11.356C6.56326 11.5348 6.30327 11.6832 6.028 11.798C5.582 11.986 5.108 12.08 4.62 12.08C4.132 12.08 3.66 11.986 3.212 11.798C3.152 11.772 3.092 11.746 3.032 11.718V16.562H3.04ZM2.44 8.474C2.44 9.67 3.42 10.64 4.626 10.64C5.442 10.64 6.154 10.198 6.53 9.542C6.588 9.442 6.692 9.38 6.808 9.38H6.82C6.934 9.38 7.04 9.442 7.098 9.542C7.28988 9.87663 7.56693 10.1545 7.901 10.3474C8.23508 10.5402 8.61425 10.6412 8.99999 10.64C9.81399 10.64 10.524 10.2 10.9 9.546C10.96 9.444 11.068 9.38 11.186 9.38C11.304 9.38 11.414 9.444 11.472 9.546C11.665 9.87935 11.9424 10.156 12.2763 10.348C12.6102 10.5401 12.9888 10.6408 13.374 10.64C14.58 10.64 15.56 9.67 15.56 8.474V6.65C15.56 6.644 15.556 6.64 15.55 6.64H2.45C2.444 6.64 2.44 6.644 2.44 6.65V8.474Z"
                        fill="black" fillOpacity="0.85"/>
                  </svg>

                  <span>Самовывоз</span>
                </div>
                <div className={styles.deliveryValue}>
                  <div className={styles.deliveryLine}>
                    <span>Магазин на Таганской:</span>
                    <p>1 шт</p>
                  </div>
                  <div className={styles.deliveryLine}>
                    <span>Магазин на Таганской:</span>
                    <p>3 шт</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <SectionBlock
            accent="Может пригодиться"
            title="Часто покупают вместе"
            description="Мы подобрали товары, которые могут вам пригодиться."
        >
          {hitProducts.length > 0 && (
              <ProductSlider products={hitProducts} slidesPerView={4} />
          )}
        </SectionBlock>
      </div>
  );
};
