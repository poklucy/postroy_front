import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryWithHierarchy } from '@/types/category.types';
import { ID } from '@/types/common.types';
import {
    buildCategoryUrl,
    buildSubcategoryUrl,
    buildGroupUrl,
} from '@/config/routes.config';
import styles from './CategoryCardWithGroups.module.css';

interface GroupLite {
    id: ID;
    slug: string;
    name: string;
    image?: string;
    subcategorySlug: string;
}

export interface CategoryCardWithGroupsProps {
    category: CategoryWithHierarchy;
    previewLimit?: number;
}

export const CategoryCardWithGroups: React.FC<CategoryCardWithGroupsProps> = ({
                                                                                  category,
                                                                                  previewLimit = 6,
                                                                              }) => {
    const allGroups: GroupLite[] = [];
    category.subcategories.forEach(sub => {
        sub.groups?.forEach(g => {
            allGroups.push({
                id: g.id,
                slug: g.slug,
                name: g.name,
                image: g.image,
                subcategorySlug: sub.slug,
            });
        });
    });

    const hasSingleSub = category.subcategories.length === 1;
    const categoryLink = hasSingleSub
        ? buildSubcategoryUrl(category.slug, category.subcategories[0].slug)
        : buildCategoryUrl(category.slug);

    const displayGroups = allGroups.slice(0, previewLimit);
    const hasMoreGroups = allGroups.length > previewLimit;

    return (
        <div className={styles.block}>
            <Link to={categoryLink} className={styles.header}>
                <div className={styles.icon}>
                    <span dangerouslySetInnerHTML={{ __html: category.icon || '' }} />
                </div>
                <h3 className={styles.name}>{category.name}</h3>
                {hasMoreGroups && (
                    <span className={styles.more}>
            Ещё {allGroups.length - previewLimit}...
          </span>
                )}
            </Link>

            <div className={styles.groupsList}>
                {displayGroups.map(group => (
                    <Link
                        key={group.id}
                        to={buildGroupUrl(category.slug, group.subcategorySlug, group.slug)}
                        className={styles.groupLink}
                    >
                        {group.image && (
                            <img
                                src={group.image}
                                alt={group.name}
                                className={styles.groupImage}
                            />
                        )}
                        <span>{group.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
