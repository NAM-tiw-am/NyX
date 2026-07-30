'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function BackendDataProvider({ children }: { children: React.ReactNode }) {
  const loadBackendData = useAppStore((state) => state.loadBackendData);

  useEffect(() => {
    loadBackendData();
  }, [loadBackendData]);

  return children;
}
