import React, { useState } from 'react';
import { Category } from '@/types/category.types';

interface CategoryImageProps {
    category: Pick<Category, 'name' | 'slug' | 'image' | 'icon'>;
    iconClassName?: string;
}

const getCategoryImageSrc = (category: CategoryImageProps['category']) =>
    category.image || `/images/categories/${category.slug}.jpg`;

export const CategoryImage: React.FC<CategoryImageProps> = ({ category, iconClassName }) => {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return category.icon ? (
            <div className={iconClassName} dangerouslySetInnerHTML={{ __html: category.icon }} />
        ) : null;
    }

    return (
        <img
            src={getCategoryImageSrc(category)}
            alt={category.name}
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
};
