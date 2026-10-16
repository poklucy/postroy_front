import React, { useId, useState } from 'react';
import { ChevronIcon } from '@/components/common/icons';
import styles from '../ProductDetailPage.module.css';

export interface ProductSection {
    key: string;
    title: string;
    content: React.ReactNode;
}

const Section: React.FC<{ section: ProductSection; defaultOpen?: boolean }> = ({ section, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);
    const contentId = useId();

    return (
        <div className={styles.section}>
            <button
                type="button"
                className={styles.sectionHeader}
                onClick={() => setOpen(value => !value)}
                aria-expanded={open}
                aria-controls={contentId}
            >
                {section.title}
                <ChevronIcon direction={open ? 'down' : 'right'} />
            </button>
            {open && (
                <div className={styles.sectionBody} id={contentId}>
                    {section.content}
                </div>
            )}
        </div>
    );
};

export const ProductSections: React.FC<{ sections: ProductSection[] }> = ({ sections }) => (
    <div className={styles.sections}>
        {sections.map((section, index) => (
            <Section key={section.key} section={section} defaultOpen={index === 0} />
        ))}
    </div>
);
