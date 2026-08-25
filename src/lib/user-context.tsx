'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TripCombination } from './types';
import { MOCK_TRIPS } from './mock-data';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneOrTelegram?: string;
  preferredOrigin: string;
  isResident: boolean;
  maxBudgetPreference: number;
  channels: {
    whatsapp: boolean;
    telegram: boolean;
    email: boolean;
  };
}

export interface PriceAlert {
  id: string;
  tripId: string;
  destination: string;
  maxBudget: number;
  email: string;
  createdAt: string;
}

export interface CustomCholloAlert {
  id: string;
  origin: string;
  destinationCity: string; // 'Cualquier destino' or specific city
  maxBudget: number;
  channel: 'whatsapp' | 'telegram' | 'email';
  active: boolean;
  createdAt: string;
}

interface UserContextType {
  user: UserProfile | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  
  favorites: string[];
  favoriteTrips: TripCombination[];
  toggleFavorite: (tripId: string) => void;
  isFavorite: (tripId: string) => boolean;

  alerts: PriceAlert[];
  addAlert: (trip: TripCombination, maxBudget: number, email: string) => void;
  isAlertModalOpen: boolean;
  selectedTripForAlert: TripCombination | null;
  openAlertModal: (trip?: TripCombination) => void;
  closeAlertModal: () => void;

  customAlerts: CustomCholloAlert[];
  addCustomAlert: (alert: Omit<CustomCholloAlert, 'id' | 'createdAt'>) => void;
  toggleCustomAlert: (id: string) => void;
  deleteCustomAlert: (id: string) => void;

  isFavoritesDrawerOpen: boolean;
  openFavoritesDrawer: () => void;
  closeFavoritesDrawer: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [customAlerts, setCustomAlerts] = useState<CustomCholloAlert[]>([]);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedTripForAlert, setSelectedTripForAlert] = useState<TripCombination | null>(null);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount (asynchronously to prevent cascading renders)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedUser = localStorage.getItem('td_user');
        if (storedUser) setUser(JSON.parse(storedUser));

        const storedFavs = localStorage.getItem('td_favorites');
        if (storedFavs) setFavorites(JSON.parse(storedFavs));

        const storedAlerts = localStorage.getItem('td_alerts');
        if (storedAlerts) setAlerts(JSON.parse(storedAlerts));

        const storedCustomAlerts = localStorage.getItem('td_custom_alerts');
        if (storedCustomAlerts) {
          setCustomAlerts(JSON.parse(storedCustomAlerts));
        } else {
          // Default sample custom alert for demonstration
          setCustomAlerts([
            {
              id: 'alert-demo-1',
              origin: 'TFS',
              destinationCity: 'Cualquier destino europeo',
              maxBudget: 130,
              channel: 'whatsapp',
              active: true,
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      } catch {
        // LocalStorage not available
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const login = (name: string, email: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || 'Viajero Canario',
      email: email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      preferredOrigin: 'TFS',
      isResident: true,
      maxBudgetPreference: 150,
      channels: {
        whatsapp: true,
        telegram: false,
        email: true,
      },
    };
    setUser(newUser);
    try {
      localStorage.setItem('td_user', JSON.stringify(newUser));
    } catch {}
    setIsAuthModalOpen(false);
    showToast(`✨ ¡Bienvenido a tu panel, ${newUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('td_user');
    } catch {}
    showToast('👋 Sesión cerrada correctamente');
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem('td_user', JSON.stringify(updated));
      } catch {}
      showToast('✅ Preferencias actualizadas');
      return updated;
    });
  };

  const toggleFavorite = (tripId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(tripId);
      const updated = exists ? prev.filter((id) => id !== tripId) : [...prev, tripId];
      try {
        localStorage.setItem('td_favorites', JSON.stringify(updated));
      } catch {}
      
      const trip = MOCK_TRIPS.find((t) => t.id === tripId);
      const name = trip ? trip.destination.city : 'Escapada';
      showToast(exists ? `❌ Eliminado de favoritos: ${name}` : `❤️ Guardado en favoritos: ${name}`);
      return updated;
    });
  };

  const isFavorite = (tripId: string) => favorites.includes(tripId);

  const favoriteTrips = MOCK_TRIPS.filter((t) => favorites.includes(t.id));

  const addAlert = (trip: TripCombination, maxBudget: number, email: string) => {
    const newAlert: PriceAlert = {
      id: `alert-${Date.now()}`,
      tripId: trip.id,
      destination: trip.destination.city,
      maxBudget,
      email,
      createdAt: new Date().toISOString(),
    };

    setAlerts((prev) => {
      const updated = [newAlert, ...prev];
      try {
        localStorage.setItem('td_alerts', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    showToast(`🔔 ¡Alerta activada para ${trip.destination.city} (< ${maxBudget} €)!`);
    setIsAlertModalOpen(false);
  };

  const addCustomAlert = (alertData: Omit<CustomCholloAlert, 'id' | 'createdAt'>) => {
    const newAlert: CustomCholloAlert = {
      ...alertData,
      id: `custom-alert-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setCustomAlerts((prev) => {
      const updated = [newAlert, ...prev];
      try {
        localStorage.setItem('td_custom_alerts', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    showToast(`🔔 Nueva alerta de chollo configurada para ${newAlert.destinationCity} (< ${newAlert.maxBudget} €)`);
  };

  const toggleCustomAlert = (id: string) => {
    setCustomAlerts((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a));
      try {
        localStorage.setItem('td_custom_alerts', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const deleteCustomAlert = (id: string) => {
    setCustomAlerts((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      try {
        localStorage.setItem('td_custom_alerts', JSON.stringify(updated));
      } catch {}
      showToast('🗑️ Alerta eliminada');
      return updated;
    });
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openAlertModal = (trip?: TripCombination) => {
    setSelectedTripForAlert(trip || MOCK_TRIPS[0]);
    setIsAlertModalOpen(true);
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
    setSelectedTripForAlert(null);
  };

  const openFavoritesDrawer = () => setIsFavoritesDrawerOpen(true);
  const closeFavoritesDrawer = () => setIsFavoritesDrawerOpen(false);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        favorites,
        favoriteTrips,
        toggleFavorite,
        isFavorite,
        alerts,
        addAlert,
        customAlerts,
        addCustomAlert,
        toggleCustomAlert,
        deleteCustomAlert,
        isAlertModalOpen,
        selectedTripForAlert,
        openAlertModal,
        closeAlertModal,
        isFavoritesDrawerOpen,
        openFavoritesDrawer,
        closeFavoritesDrawer,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
