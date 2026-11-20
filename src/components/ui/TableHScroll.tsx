"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type TableHScrollProps = {
  children: ReactNode;
  className?: string;
};

/** Horizontal table scroller with a persistent tiny gray slider (mobile-friendly). */
export function TableHScroll({ children, className = "" }: TableHScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ width: 100, left: 0, needed: false });
  const dragging = useRef(false);

  const sync = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const needed = scrollWidth > clientWidth + 1;
    if (!needed) {
      setThumb({ width: 100, left: 0, needed: false });
      return;
    }
    const ratio = clientWidth / scrollWidth;
    const widthPct = Math.max(ratio * 100, 18);
    const maxLeft = 100 - widthPct;
    const leftPct = (scrollLeft / (scrollWidth - clientWidth)) * maxLeft;
    setThumb({ width: widthPct, left: leftPct, needed: true });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  function scrollFromClientX(clientX: number) {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track || !thumb.needed) return;
    const rect = track.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const thumbPx = (thumb.width / 100) * rect.width;
    const maxThumbLeft = rect.width - thumbPx;
    const thumbLeft = Math.min(Math.max(x - thumbPx / 2, 0), maxThumbLeft);
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollLeft = maxThumbLeft > 0 ? (thumbLeft / maxThumbLeft) * maxScroll : 0;
  }

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragging.current) return;
      scrollFromClientX(e.clientX);
    }
    function onUp() {
      dragging.current = false;
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [thumb.needed, thumb.width]);

  return (
    <div className={`min-w-0 ${className}`.trim()}>
      <div
        ref={scrollerRef}
        className="table-h-scroll-pane w-full max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain"
      >
        {children}
      </div>
      {thumb.needed ? (
        <div
          ref={trackRef}
          className="mt-3 h-1.5 w-full cursor-pointer rounded-full bg-[#e5e7eb]"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            scrollFromClientX(e.clientX);
          }}
          role="scrollbar"
          aria-orientation="horizontal"
          aria-valuenow={Math.round(thumb.left)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-1.5 rounded-full bg-[#9ca3af]"
            style={{ width: `${thumb.width}%`, marginLeft: `${thumb.left}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
