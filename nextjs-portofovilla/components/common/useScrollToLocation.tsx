import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useScrollToLocation = () => {
  const scrolledRef = useRef(false); // Tracks if we’ve scrolled
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hashRef = useRef(""); // Tracks the current hash value

  useEffect(() => {
    const hash = window.location.hash; // Get the current hash from the URL

    if (!hash) return; // Exit if there is no hash

    // Reset if the hash changes
    if (hashRef.current !== hash) {
      hashRef.current = hash;
      scrolledRef.current = false;
    }

    // Scroll only if we haven’t scrolled yet
    if (!scrolledRef.current) {
      const targetId = hash.replace("#", ""); // Remove '#' to get the ID
      const targetElement = document.getElementById(targetId); // Find the element

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        scrolledRef.current = true; // Mark as scrolled
      }
    }
  }, [pathname, searchParams]); // Trigger the effect when pathname or search params change
};