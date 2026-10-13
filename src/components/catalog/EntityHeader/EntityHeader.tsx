import React from 'react';
import styles from './EntityHeader.module.css';

export interface EntityHeaderProps {
    title: string;
    description?: string;
    count?: number;
}

export const EntityHeader: React.FC<EntityHeaderProps> = ({ title }) => (
    <h1 className={styles.title}>{title}</h1>
);
