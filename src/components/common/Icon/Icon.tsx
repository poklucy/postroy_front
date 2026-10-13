import React from 'react';
import styles from './Icon.module.css';

interface IconProps {
  icon?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, className = '' }) => {
  if (icon?.includes('<svg')) {
    return (
      <span
        className={`${styles.icon} ${className}`}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
    );
  }

  return <span className={`${styles.icon} ${className}`}>{icon}</span>;
};
