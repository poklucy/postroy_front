import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import Footer from '@/components/layout/Footer';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
