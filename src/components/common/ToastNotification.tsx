'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/lib/user-context';

export default function ToastNotification() {
  const { toastMessage } = useUser();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="td-glass-strong rounded-2xl px-5 py-3.5 shadow-2xl border border-white/20 text-white text-xs sm:text-sm font-semibold flex items-center gap-2.5">
            <span>{toastMessage}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
