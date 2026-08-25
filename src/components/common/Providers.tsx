'use client';

import { Suspense } from 'react';
import { UserProvider } from '@/lib/user-context';
import PriceAlertModal from './PriceAlertModal';
import FavoritesDrawer from './FavoritesDrawer';
import ToastNotification from './ToastNotification';
import CookieBanner from '@/components/layout/CookieBanner';
import AuthModal from '@/components/auth/AuthModal';
import PlaneCursor from './PlaneCursor';
import FlightProgressBar from './FlightProgressBar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Suspense fallback={null}>
        <FlightProgressBar />
      </Suspense>
      {children}
      <PriceAlertModal />
      <FavoritesDrawer />
      <ToastNotification />
      <CookieBanner />
      <AuthModal />
      <PlaneCursor />
    </UserProvider>
  );
}
