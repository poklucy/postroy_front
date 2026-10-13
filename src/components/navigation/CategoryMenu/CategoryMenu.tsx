import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAllCategories } from '@/hooks/useCategories';
import { useClickOutside } from '@/hooks/useClickOutside';
import { buildSubcategoryUrl, buildGroupUrl } from '@/config/routes.config';
import { Icon } from '@/components/common/Icon';
import styles from './CategoryMenu.module.css';

export const CategoryMenu: React.FC = () => {
  const { categories, isLoading } = useAllCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && categories.length > 0 && !activeCategory) {
      setActiveCategory(String(categories[0].id));
    }
  }, [isOpen, categories, activeCategory]);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveCategory(null);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  useClickOutside(menuRef, closeMenu, isOpen);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const activeCategoryData = categories.find(c => String(c.id) === activeCategory);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
      <div className={styles.categoryMenu} ref={menuRef}>
        <button
            className={`${styles.toggleButton} btn`}
            onClick={toggleMenu}
            aria-expanded={isOpen}
        >
          {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          ) : (
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6 2.93334H12.2666M21.6 11.1H12.2666M21.6 19.2667H12.2666M0.599976 0.600006H7.59998V7.60001H0.599976V0.600006ZM0.599976 14.6H7.59998V21.6H0.599976V14.6Z" stroke="black" strokeWidth="1.2" strokeLinecap="square"/>
              </svg>
          )}
          <span>Каталог</span>
        </button>

        {isOpen && (
            <div className={styles.overlay}>
              <div className={styles.menuContainer}>
                <div className={`${styles.menuContainerMain} container`}>
                  <div className={styles.columnLeft}>
                    <ul className={styles.categoryList}>
                      {categories.map((category) => (
                          <li
                              key={category.id}
                              className={`${styles.categoryItem} ${String(category.id) === activeCategory ? styles.active : ''}`}
                          >
                            <button
                                className={`${styles.categoryButton} h3`}
                                onClick={() => handleCategoryClick(String(category.id))}
                            >
                              <Icon icon={category.icon}/>
                              {category.name}
                            </button>
                          </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.columnRight}>
                    {activeCategoryData && activeCategoryData.subcategories?.length > 0 ? (
                        <div className={styles.subcategoryList}>
                          {activeCategoryData.subcategories.map((subcategory) => (
                              <div key={subcategory.id} className={styles.subcategoryGroup}>
                                <Link
                                    to={buildSubcategoryUrl(activeCategoryData.slug, subcategory.slug)}
                                    className={`${styles.subcategoryTitle} h3`}
                                    onClick={closeMenu}
                                >
                                  {subcategory.name}
                                </Link>

                                {subcategory.groups && subcategory.groups.length > 0 && (
                                    <ul className={styles.groupList}>
                                      {subcategory.groups.map((group) => (
                                          <li key={group.id} className={styles.groupItem}>
                                            <Link
                                                to={buildGroupUrl(activeCategoryData.slug, subcategory.slug, group.slug)}
                                                className={styles.groupLink}
                                                onClick={closeMenu}
                                            >
                                              {group.name}
                                            </Link>
                                          </li>
                                      ))}
                                    </ul>
                                )}
                              </div>
                          ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                          <p>
                            {activeCategoryData
                                ? 'В этой категории пока нет подкатегорий'
                                : 'Выберите категорию'}
                          </p>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};
