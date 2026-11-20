"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/lib/nav";

type SideNavProps = {
  active?: string;
  open: boolean;
  onClose: () => void;
};

export function SideNav({ active = "SIMs", open, onClose }: SideNavProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const panel = (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed left-0 top-[var(--header-height)] z-50 flex h-[calc(100dvh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] w-[200px] flex-col justify-between overflow-y-auto overscroll-contain border-r border-[rgba(9,30,66,0.08)] bg-white px-3 py-10 shadow-[2px_0_4px_rgba(0,0,0,0.04)] transition-transform max-[1199px]:w-[176px] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex w-full flex-col gap-2">
          {PRIMARY_NAV.map((item) => {
            const isActive = item.label === active;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex w-full items-center px-2 py-4 text-sm ${
                  isActive
                    ? "border-b-2 border-roam-navy bg-[rgba(0,58,93,0.08)] font-semibold text-roam-navy"
                    : "rounded-lg font-medium text-roam-nav-idle hover:bg-roam-surface-soft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <nav className="flex w-full flex-col gap-2">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex w-full items-center rounded-lg px-2 py-4 text-sm font-medium text-roam-nav-idle hover:bg-roam-surface-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );

  if (!mounted) return null;
  return createPortal(panel, document.body);
}
