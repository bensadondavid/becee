"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const getHashId = (hash: string) => {
  const rawId = hash.slice(1);
  try {
    return decodeURIComponent(rawId);
  } catch {
    return rawId;
  }
};

export default function ScrollToTop() {
  const pathname = usePathname();
  const isPopRef = useRef(false);
  const isFirstRef = useRef(true);

  useEffect(() => {
    const onPopState = () => {
      isPopRef.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    // 1er rendu = équivalent du "POP" initial de react-router → on laisse le navigateur gérer
    if (isFirstRef.current) {
      isFirstRef.current = false;
      return;
    }

    if (isPopRef.current) {
      isPopRef.current = false;
      return;
    }

    const hash = window.location.hash;

    if (hash) {
      const id = getHashId(hash);
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
