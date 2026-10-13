import React from 'react';
import { Link } from 'react-router-dom';
import { ID } from '@/types/common.types';
import styles from './EntityGrid.module.css';

export interface EntityGridItem {
    id: ID;
    name: string;
    slug: string;
    image?: string;
    description?: string;
}

export interface EntityGridProps {
    items: EntityGridItem[];
    buildUrl: (item: EntityGridItem) => string;
    title?: string;
    emptyMessage?: string;
    showDescription?: boolean;
}

export const EntityGrid: React.FC<EntityGridProps> = ({
                                                          items,
                                                          buildUrl,
                                                          title,
                                                          emptyMessage = 'Ничего не найдено',
                                                      }) => {
    if (items.length === 0) {
        return (
            <section className={styles.section}>
                {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                <div className={styles.empty}>
                    <p>{emptyMessage}</p>
                </div>
            </section>
        );
    }

    return (
        <div className={styles.grid}>
            {items.map(item => (
                <Link key={item.id} to={buildUrl(item)} className={styles.card}>
                    {item.image && (
                        <img src={item.image} alt={item.name} className={styles.image}/>
                    )}
                    <p>{item.name}</p>
                </Link>
            ))}
        </div>
    );
};
