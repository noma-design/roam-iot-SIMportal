"use client";

import { useEffect, useState } from "react";

/**
 * True only on desktop with a real hover pointer.
 * Tablet/mobile always get click/press tip behavior even if the device
 * reports a fine pointer (e.g. iPad with trackpad).
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1200px)",
    );
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine;
}
