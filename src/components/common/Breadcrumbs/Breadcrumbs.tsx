import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductBySlug } from '@/store/slices/products';
import { selectCurrentProduct } from '@/store/slices/products/products.selectors';
import { useAllCategories } from '@/hooks/useCategories';
import { CategoryWithHierarchy } from '@/types/category.types';
import {
  ROUTES,
  STATIC_PAGE_LABELS,
  buildCategoryUrl,
  buildSubcategoryUrl,
  buildGroupUrl,
} from '@/config/routes.config';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast?: boolean;
}

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const pathnames = useMemo(
      () => location.pathname.split('/').filter(x => x),
      [location.pathname]
  );

  const product = useAppSelector(selectCurrentProduct);
  const { categories } = useAllCategories();

  const slugMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach(category => {
      map[category.slug] = category.name;
      category.subcategories?.forEach(sub => {
        map[sub.slug] = sub.name;
        sub.groups?.forEach(group => {
          map[group.slug] = group.name;
        });
      });
    });
    return map;
  }, [categories]);

  const isProductPage =
      (pathnames[0] === 'product' && pathnames.length === 2) ||
      pathnames.length === 4;

  const productSlug = isProductPage ? pathnames[pathnames.length - 1] : undefined;

  useEffect(() => {
    if (isProductPage && productSlug && (!product || product.slug !== productSlug)) {
      dispatch(fetchProductBySlug(productSlug));
    }
  }, [isProductPage, productSlug, product, dispatch]);

  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
    const getLabel = (slug: string) => slugMap[slug] || slug;

    const findCategory = (slug: string): CategoryWithHierarchy | undefined =>
        categories.find(c => c.slug === slug);

    const items: BreadcrumbItem[] = [{ label: 'Главная', path: '/' }];

    if (pathnames.length === 0) return items;

    if (pathnames[0] !== 'catalog' && STATIC_PAGE_LABELS[pathnames[0]]) {
      pathnames.forEach((segment, index) => {
        items.push({
          label: STATIC_PAGE_LABELS[segment] || segment,
          path: `/${pathnames.slice(0, index + 1).join('/')}`,
          isLast: index === pathnames.length - 1,
        });
      });
      return items;
    }

    if (pathnames[0] === 'catalog' && pathnames.length === 1) {
      items.push({ label: 'Каталог', path: ROUTES.CATALOG, isLast: true });
      return items;
    }

    if (pathnames[0] === 'product' && pathnames.length === 2) {
      items.push({ label: 'Каталог', path: ROUTES.CATALOG });
      if (product) {
        if (product.category?.slug) {
          items.push({
            label: product.category.name,
            path: buildCategoryUrl(product.category.slug),
          });
        }
        if (product.subcategory?.slug && product.category?.slug) {
          items.push({
            label: product.subcategory.name,
            path: buildSubcategoryUrl(product.category.slug, product.subcategory.slug),
          });
        }
        if (product.group?.slug && product.category?.slug && product.subcategory?.slug) {
          items.push({
            label: product.group.name,
            path: buildGroupUrl(
                product.category.slug,
                product.subcategory.slug,
                product.group.slug
            ),
          });
        }
        items.push({ label: product.name, path: location.pathname, isLast: true });
      } else {
        items.push({ label: productSlug || '', path: location.pathname, isLast: true });
      }
      return items;
    }

    if (pathnames.length === 4) {
      const [categorySlug, subcategorySlug, groupSlug] = pathnames;
      const category = findCategory(categorySlug);
      const hasSingleSub = category?.subcategories.length === 1;

      items.push({ label: 'Каталог', path: ROUTES.CATALOG });
      items.push({
        label: product?.category?.name || getLabel(categorySlug),
        path: buildCategoryUrl(categorySlug),
      });

      if (!hasSingleSub) {
        items.push({
          label: product?.subcategory?.name || getLabel(subcategorySlug),
          path: buildSubcategoryUrl(categorySlug, subcategorySlug),
        });
      }

      items.push({
        label: product?.group?.name || getLabel(groupSlug),
        path: buildGroupUrl(categorySlug, subcategorySlug, groupSlug),
      });

      items.push({
        label: product?.name || productSlug || '',
        path: location.pathname,
        isLast: true,
      });

      return items;
    }

    if (pathnames.length === 3) {
      const [categorySlug, subcategorySlug, groupSlug] = pathnames;
      const category = findCategory(categorySlug);
      const hasSingleSub = category?.subcategories.length === 1;

      items.push({ label: 'Каталог', path: ROUTES.CATALOG });
      items.push({
        label: getLabel(categorySlug),
        path: buildCategoryUrl(categorySlug),
      });

      if (!hasSingleSub) {
        items.push({
          label: getLabel(subcategorySlug),
          path: buildSubcategoryUrl(categorySlug, subcategorySlug),
        });
      }

      items.push({
        label: getLabel(groupSlug),
        path: buildGroupUrl(categorySlug, subcategorySlug, groupSlug),
        isLast: true,
      });

      return items;
    }

    if (pathnames.length === 2) {
      const [categorySlug, subcategorySlug] = pathnames;
      const category = findCategory(categorySlug);

      items.push({ label: 'Каталог', path: ROUTES.CATALOG });
      items.push({
        label: getLabel(categorySlug),
        path: buildCategoryUrl(categorySlug),
      });

      if (category && category.subcategories.length > 1) {
        items.push({
          label: getLabel(subcategorySlug),
          path: buildSubcategoryUrl(categorySlug, subcategorySlug),
          isLast: true,
        });
      } else {
        items[items.length - 1].isLast = true;
      }

      return items;
    }

    if (pathnames.length === 1) {
      items.push({ label: 'Каталог', path: ROUTES.CATALOG });
      items.push({
        label: getLabel(pathnames[0]),
        path: buildCategoryUrl(pathnames[0]),
        isLast: true,
      });
      return items;
    }

    return items;
  }, [pathnames, product, productSlug, location.pathname, slugMap, categories]);

  return (
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <ol className={styles.list}>
          {breadcrumbs.map((item, index) => {
            const isLast = item.isLast || index === breadcrumbs.length - 1;
            return (
                <li key={`${item.path}-${index}`} className={styles.item}>
                  {isLast ? (
                      <span className={styles.current}>{item.label}</span>
                  ) : (
                      <>
                        <Link to={item.path} className={styles.link}>
                          {item.label}
                        </Link>
                        <span className={styles.separator}>/</span>
                      </>
                  )}
                </li>
            );
          })}
        </ol>
      </nav>
  );
};
