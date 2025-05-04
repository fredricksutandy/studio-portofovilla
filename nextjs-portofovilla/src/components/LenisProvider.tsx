// components/LenisProvider.tsx
'use client';

import { useEffect } from 'react';
import { lenis } from '@/lib/lenis'; // or use relative path if not using alias

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return <>{children}</>;
}
