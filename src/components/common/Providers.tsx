'use client';

import { UserProvider } from '@/lib/user-context';
import PriceAlertModal from './PriceAlertModal';
import FavoritesDrawer from './FavoritesDrawer';
import ToastNotification from './ToastNotification';
import CookieBanner from '@/components/layout/CookieBanner';
import AuthModal from '@/components/auth/AuthModal';
import PlaneCursor from './PlaneCursor';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
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
