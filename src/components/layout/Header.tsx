"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { PROFILE_MENU, SEARCH_CRITERIA } from "@/lib/nav";
import { useIsMobile } from "@/hooks/useIsMobile";

type HeaderProps = {
  onMenuToggle: () => void;
};

type SearchBarProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  className?: string;
  /** Stretch to fill available header space (mobile/tablet expanded). */
  fillWidth?: boolean;
  searchActive: boolean;
  searchOpen: boolean;
  searchQuery: string;
  criteria: (typeof SEARCH_CRITERIA)[number];
  onToggleCriteria: () => void;
  onFocusInput: () => void;
  onQueryChange: (value: string) => void;
  onClearQuery: () => void;
  onSelectCriteria: (item: (typeof SEARCH_CRITERIA)[number]) => void;
};

function SearchBar({
  containerRef,
  inputRef,
  className = "",
  fillWidth = false,
  searchActive,
  searchOpen,
  searchQuery,
  criteria,
  onToggleCriteria,
  onFocusInput,
  onQueryChange,
  onClearQuery,
  onSelectCriteria,
}: SearchBarProps) {
  return (
    <div ref={containerRef} className={`relative items-center ${className}`}>
      <div
        className={`flex h-8 items-center overflow-hidden rounded-lg min-[768px]:h-10 min-[1200px]:h-11 ${
          fillWidth
            ? "w-full max-w-none"
            : "w-full max-w-[296px] min-[1200px]:w-[296px]"
        } ${searchActive ? "border border-white" : ""}`}
      >
        <button
          type="button"
          aria-label="Search criteria"
          aria-expanded={searchOpen}
          onClick={onToggleCriteria}
          className="flex h-8 shrink-0 items-center border border-y border-l border-white/15 border-r-0 bg-white/20 px-2 min-[768px]:h-10 min-[768px]:py-2.5 min-[1200px]:h-11"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/caret-down-search.svg"
            alt=""
            width={20}
            height={20}
            className="size-5"
          />
        </button>

        <div className="relative flex h-8 flex-1 items-center border border-white/[0.01] bg-white/10 px-3 min-[768px]:h-10 min-[1200px]:h-11">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            placeholder={`Search by ${criteria}`}
            onFocus={onFocusInput}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/70"
          />
          {searchQuery ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={onClearQuery}
              className="ml-2 shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/search-clear.svg"
                alt=""
                width={20}
                height={20}
                className="size-5"
              />
            </button>
          ) : null}
        </div>

        <button
          type="button"
          aria-label="Search"
          className="flex h-8 shrink-0 items-center justify-center border border-white/10 bg-white/30 px-2 min-[768px]:h-10 min-[768px]:py-2.5 min-[1200px]:h-11"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/search-magnifier.svg"
            alt=""
            width={20}
            height={20}
            className="size-5"
          />
        </button>
      </div>

      {searchOpen ? (
        <div className="absolute left-0 top-[calc(100%+8px)] z-40 flex w-[160px] flex-col gap-2 bg-white py-2 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          {SEARCH_CRITERIA.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelectCriteria(item)}
              className="rounded-[3px] px-2 py-4 text-left text-sm font-medium text-[#6b758b] hover:bg-[rgba(0,58,93,0.1)] active:bg-[rgba(0,58,93,0.15)]"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Header({ onMenuToggle }: HeaderProps) {
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [compactSearchExpanded, setCompactSearchExpanded] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpHover, setHelpHover] = useState(false);
  const [hwHover, setHwHover] = useState(false);
  const [criteria, setCriteria] = useState<(typeof SEARCH_CRITERIA)[number]>("IMSI");
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const compactSearchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const compactInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      const inDesktop = desktopSearchRef.current?.contains(target);
      const inCompact = compactSearchRef.current?.contains(target);

      if (!inDesktop && !inCompact) {
        setSearchOpen(false);
        setSearchFocused(false);
      }
      if (compactSearchExpanded && !inCompact) {
        setCompactSearchExpanded(false);
        setSearchOpen(false);
        setSearchFocused(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) setProfileOpen(false);
      if (helpRef.current && !helpRef.current.contains(target)) setHelpOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [compactSearchExpanded]);

  useEffect(() => {
    if (!compactSearchExpanded) return;
    compactInputRef.current?.focus();
  }, [compactSearchExpanded]);

  useEffect(() => {
    if (!compactSearchExpanded) return;
    function onScroll() {
      setCompactSearchExpanded(false);
      setSearchOpen(false);
      setSearchFocused(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [compactSearchExpanded]);

  const searchActive = searchFocused || searchQuery.length > 0;
  const showHelpTip = isMobile ? helpOpen : helpHover;

  const searchBarProps = {
    searchActive,
    searchOpen,
    searchQuery,
    criteria,
    onToggleCriteria: () => setSearchOpen((v) => !v),
    onFocusInput: () => setSearchFocused(true),
    onQueryChange: setSearchQuery,
    onClearQuery: () => {
      setSearchQuery("");
      (compactSearchExpanded ? compactInputRef : desktopInputRef).current?.focus();
    },
    onSelectCriteria: (item: (typeof SEARCH_CRITERIA)[number]) => {
      setCriteria(item);
      setSearchOpen(false);
      (compactSearchExpanded ? compactInputRef : desktopInputRef).current?.focus();
    },
  };

  return (
    <header className="sticky top-0 z-30 flex h-[var(--header-height)] items-center gap-3 bg-roam-navy px-[var(--grid-margin)] min-[768px]:gap-4 min-[1200px]:h-auto min-[1200px]:pb-5 min-[1200px]:pt-9">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onMenuToggle}
        className="relative size-7 shrink-0 min-[768px]:size-8"
      >
        <Image
          src="/assets/menu-list.svg"
          alt=""
          width={28}
          height={28}
          className="size-7 min-[768px]:size-8"
        />
      </button>

      {/* Expanded compact search: fills from logo slot through search-icon slot */}
      {compactSearchExpanded ? (
        <SearchBar
          containerRef={compactSearchRef}
          inputRef={compactInputRef}
          fillWidth
          className="flex h-8 min-w-0 flex-1 items-center min-[768px]:h-10 min-[1200px]:hidden"
          {...searchBarProps}
        />
      ) : null}

      {/* Logo (+ tablet pill). Hidden while compact search is open (desktop always keeps it). */}
      <div
        className={`min-w-0 items-center gap-8 ${
          compactSearchExpanded
            ? "hidden min-[1200px]:flex min-[1200px]:flex-none"
            : "flex min-w-0 flex-1 min-[1200px]:flex-none"
        }`}
      >
        <Image
          src="/assets/logo.svg"
          alt="Roam IoT"
          width={200}
          height={52}
          className="h-8 w-auto min-[768px]:h-10 min-[1200px]:h-[52px]"
          priority
        />
        <span className="hidden rounded-full bg-white/10 px-2 py-[6px] text-xs text-white min-[768px]:inline-flex">
          IoT Control Center
        </span>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-3 min-[768px]:gap-4 min-[1200px]:gap-[60px]">
        <SearchBar
          containerRef={desktopSearchRef}
          inputRef={desktopInputRef}
          className="hidden min-[1200px]:flex"
          {...searchBarProps}
        />

        {!compactSearchExpanded ? (
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setCompactSearchExpanded(true)}
            className="inline-flex size-8 items-center justify-center min-[1200px]:hidden"
          >
            <Image src="/assets/search.svg" alt="" width={20} height={20} className="size-5" />
          </button>
        ) : null}

        <div className="flex items-center gap-3 min-[768px]:gap-5 min-[1200px]:gap-10">
          <div
            ref={helpRef}
            className="relative"
            onMouseEnter={() => {
              if (!isMobile) setHelpHover(true);
            }}
            onMouseLeave={() => {
              if (!isMobile) setHelpHover(false);
            }}
          >
            <button
              type="button"
              aria-label="Help Center"
              className="p-1"
              onClick={() => {
                if (isMobile) setHelpOpen((v) => !v);
              }}
            >
              <Image src="/assets/question.svg" alt="" width={20} height={20} />
            </button>
            {showHelpTip ? (
              <div className="absolute right-0 top-[calc(100%+6px)] z-40 whitespace-nowrap bg-[#1a1a1a] px-2 py-1 text-sm font-medium text-white">
                Help Center
              </div>
            ) : null}
          </div>

          <div ref={profileRef} className="relative flex items-center gap-2 min-[768px]:gap-3 min-[1200px]:gap-5">
            <div
              className="relative"
              onMouseEnter={() => {
                if (!isMobile) setHwHover(true);
              }}
              onMouseLeave={() => {
                if (!isMobile) setHwHover(false);
              }}
            >
              <button
                type="button"
                aria-label="Account"
                onClick={() => {
                  if (isMobile) setProfileOpen((v) => !v);
                }}
                className="flex size-[34px] items-center justify-center rounded-full bg-roam-teal text-sm font-semibold text-white"
              >
                HW
              </button>
              {!isMobile && hwHover ? (
                <div className="absolute left-1/2 top-[calc(100%+6px)] -translate-x-1/2 whitespace-nowrap bg-[#1a1a1a] px-2 py-1 text-sm font-medium tracking-wide text-white">
                  HICKLE-WIEGAND
                </div>
              ) : null}
            </div>

            {/* Mobile: caret only (no username in header) */}
            <button
              type="button"
              aria-label="Open profile menu"
              onClick={() => setProfileOpen((v) => !v)}
              className="inline-flex items-center py-1.5 min-[768px]:hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/caret-down-search.svg"
                alt=""
                width={20}
                height={20}
                className={`size-5 transition-transform ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Tablet/desktop: username + caret */}
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              className="hidden items-center gap-3 py-1.5 text-sm font-medium text-white min-[768px]:flex"
            >
              <span>KHW@DELPHI_RO</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/caret-down-search.svg"
                alt=""
                width={20}
                height={20}
                className={`size-5 transition-transform ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {profileOpen ? (
              <div className="absolute right-0 top-[calc(100%+8px)] z-40 flex w-[200px] flex-col bg-white py-2 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                {/* Mobile: static username header */}
                <div className="pointer-events-none mx-2 mb-2 rounded border border-[#003A5D] px-2 py-2 text-[14px] font-medium leading-none text-[#003A5D] min-[768px]:hidden">
                  KHW@DELPHI_RO
                </div>
                <div className="flex flex-col gap-2">
                  {PROFILE_MENU.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setProfileOpen(false)}
                      className="rounded-[3px] px-2 py-4 text-left text-sm font-medium text-[#6b758b] hover:bg-[rgba(0,58,93,0.1)] active:bg-[rgba(0,58,93,0.15)]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
