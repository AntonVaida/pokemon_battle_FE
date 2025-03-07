"use client";
import { useState, useEffect } from "react";

export const useOrientation = () => {
  const [isPortrait, setIsPortrait] = useState(
    typeof window !== "undefined" ? window.matchMedia("(orientation: portrait)").matches : true
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const handleOrientationChange = (e) => {
      setIsPortrait(e?.matches)
    };

    mediaQuery.addEventListener("change", handleOrientationChange);
    return () => mediaQuery.removeEventListener("change", handleOrientationChange);
  }, []);

  return {
    isPortrait
  }
}