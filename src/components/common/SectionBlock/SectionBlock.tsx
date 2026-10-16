import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SectionBlock.module.css';

export interface SectionBlockProps {
    accent: string;
    title: string;
    mobileTitle?: string;
    compactOnMobile?: boolean;
    description?: string;
    linkText?: string;
    linkHref?: string;
    id?: string;
    className?: string;
    headerClassName?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
}

export const SectionBlock: React.FC<SectionBlockProps> = ({
                                                              accent,
                                                              title,
                                                              mobileTitle,
                                                              compactOnMobile = false,
                                                              description,
                                                              linkText,
                                                              linkHref = '',
                                                              className,
                                                              headerClassName,
                                                              children,
                                                              footer,
                                                          }) => {
    const sectionClass = [styles.sectionMain, compactOnMobile ? styles.compact : '', className]
        .filter(Boolean)
        .join(' ');
    const headerClass = [styles.sectionHeader, headerClassName]
        .filter(Boolean)
        .join(' ');

    return (
        <section className={sectionClass}>
            <div className={headerClass}>
                <div className={styles.accentBreadcrumbs}>{accent}</div>
                <h2 className={styles.title}>
                    {mobileTitle ? (
                        <>
                            <span className={styles.desktopTitle}>{title}</span>
                            <span className={styles.mobileTitle}>{mobileTitle}</span>
                        </>
                    ) : title}
                </h2>
                {description && <p className={styles.description}>{description}</p>}
                {linkText && linkHref && (
                    <Link to={linkHref} className={styles.link}>
                        {linkText}
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path
                                d="M0.671594 8.73598L-0.000406206 8.06398L6.78359 1.27998L0.879594 0.879975L1.75959 -2.47955e-05L8.35159 0.367975L8.73559 6.95998L7.85559 7.83998L7.45559 1.95198L0.671594 8.73598Z"
                                fill="black"/>
                        </svg>
                    </Link>
                )}
            </div>
            {children}
            {footer}
        </section>
    );
};
