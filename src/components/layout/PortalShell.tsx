"use client";

import { useState } from "react";
import { Header } from "./Header";
import { SideNav } from "./SideNav";

type PortalShellProps = {
  children: React.ReactNode;
  activeNav?: string;
};

export function PortalShell({ children, activeNav = "SIMs" }: PortalShellProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="portal-page min-h-screen bg-roam-surface">
      <Header onMenuToggle={() => setNavOpen((v) => !v)} />
      <SideNav
        active={activeNav}
        open={navOpen}
        onClose={() => setNavOpen(false)}
      />
      <main className="portal-content pb-16 pt-6 min-[1200px]:pt-9">{children}</main>
      <footer className="portal-content py-8 text-center text-xs leading-[21px] text-roam-footer">
        ©2026 Roam IoT. All rights reserved.
      </footer>
    </div>
  );
}
