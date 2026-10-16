import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '../Header/Header';
import Footer from '@/components/layout/Footer';
import { NetworkStatus } from '@/components/layout/NetworkStatus';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toast } from '@/components/layout/Toast';
import { CookieBanner } from '@/components/layout/CookieBanner';
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
      <BottomNav />
      <CookieBanner />
      <Toast />
      <NetworkStatus />
      <ScrollRestoration />
    </div>
  );
};
