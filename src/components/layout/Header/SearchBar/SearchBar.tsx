import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
                                                      placeholder = 'Название или артикул товара',
                                                      className,
                                                    }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className={[styles.searchBar, className].filter(Boolean).join(' ')} onSubmit={handleSubmit} role="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={styles.searchInput}
      />
        <button type="submit" className={styles.searchButton} aria-label="Найти">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.54785 3.5C11.2277 3.50005 12.6392 4.08638 13.8125 5.26758C14.9872 6.45001 15.5703 7.86433 15.5703 9.53906C15.5703 10.2114 15.4638 10.8511 15.2539 11.4609C15.0445 12.0694 14.7301 12.6438 14.3057 13.1846L14.0303 13.5352L14.3467 13.8486L20.3916 19.8428L20.3936 19.8457C20.4647 19.9154 20.5 19.9922 20.5 20.1104C20.5 20.2289 20.4651 20.3103 20.3906 20.3848H20.3896L20.3887 20.3867C20.3109 20.4653 20.2281 20.5 20.1113 20.5C19.9955 20.5 19.924 20.4656 19.8594 20.3965L19.8535 20.3906L19.8477 20.3838L13.8271 14.3701L13.502 14.0449L13.1504 14.3428C12.7578 14.676 12.3037 14.948 11.7842 15.1572L11.5576 15.2432C10.9478 15.4599 10.2912 15.5703 9.58496 15.5703C7.87485 15.5702 6.44583 14.9822 5.2666 13.8018C4.08524 12.619 3.50002 11.2063 3.5 9.53516C3.5 7.8642 4.08572 6.45138 5.26855 5.26855C6.45071 4.08625 7.86765 3.5 9.54785 3.5ZM9.5625 4.21191C8.08344 4.21191 6.81004 4.73459 5.77246 5.77148C4.73632 6.80726 4.21191 8.07138 4.21191 9.53516C4.21194 10.9988 4.73597 12.2621 5.77148 13.2979C6.80858 14.3351 8.08226 14.8574 9.5625 14.8574C11.0304 14.8574 12.2919 14.334 13.3174 13.2959C14.341 12.2597 14.8574 10.9969 14.8574 9.53516C14.8574 8.07327 14.3399 6.80966 13.3154 5.77344C12.2897 4.73604 11.029 4.21199 9.5625 4.21191Z"
                    fill="black" stroke="black"/>
            </svg>
        </button>
    </form>
  );
};
