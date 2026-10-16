import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    radius?: number | string;
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 16, radius = 4, className }) => (
    <span
        className={[styles.skeleton, className].filter(Boolean).join(' ')}
        style={{ width, height, borderRadius: radius }}
        aria-hidden="true"
    />
);

interface SkeletonGroupProps {
    label: string;
    className?: string;
    children: React.ReactNode;
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({ label, className, children }) => (
    <div className={className} role="status" aria-live="polite" aria-busy="true">
        <span className={styles.srOnly}>{label}</span>
        {children}
    </div>
);
