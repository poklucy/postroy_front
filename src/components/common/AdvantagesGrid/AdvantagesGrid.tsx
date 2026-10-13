import React from 'react';
import styles from './AdvantagesGrid.module.css';

export interface Advantage {
    icon: React.ReactNode;
    title: string;
    text: string;
}

interface AdvantagesGridProps {
    items: Advantage[];
    className?: string;
}

export const AdvantagesGrid: React.FC<AdvantagesGridProps> = ({ items, className }) => (
    <div
        className={[styles.grid, className].filter(Boolean).join(' ')}
        style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
    >
        {items.map(item => (
            <div key={item.title} className={styles.item}>
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.text}>
                    <h3>{item.title}</h3>
                    <p className="small-text">{item.text}</p>
                </div>
            </div>
        ))}
    </div>
);
