// lib/lenis.ts
import Lenis from '@studio-freight/lenis';

export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});


// // src/components/LenisProvider.tsx
// import { useEffect, useRef } from 'react';
// import Lenis from '@studio-freight/lenis';

// export default function LenisProvider({ children }) {
//   const lenisRef = useRef<Lenis | null>(null);

//   useEffect(() => {
//     // Only runs on the client
//     lenisRef.current = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smooth: true,
//     });

//     function raf(time: number) {
//       lenisRef.current?.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     return () => {
//       // Clean up
//       lenisRef.current?.destroy();
//     };
//   }, []);

//   return <>{children}</>;
// }