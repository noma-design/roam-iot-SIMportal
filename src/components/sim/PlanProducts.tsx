"use client";

import { useEffect, useRef, useState } from "react";
import { TableHScroll } from "@/components/ui/TableHScroll";

const ROWS = [
  {
    item: "R-IOT Core SIM",
    category: "SIM Product",
    created: "2026-03-01 12:12:00",
    modified: "2026-03-01 12:12:00",
  },
  {
    item: "100 MB/Month",
    category: "Data Allowance",
    created: "2026-03-01 12:12:00",
    modified: "2026-03-01 12:12:00",
  },
  {
    item: "Global Roam Z1 - 9",
    category: "Coverage Zones",
    created: "2026-03-01 12:12:00",
    modified: "2026-03-01 12:12:00",
  },
  {
    item: "R-IOT Profile 4",
    category: "Access Configuration",
    created: "2026-03-01 12:12:00",
    modified: "2026-03-01 12:12:00",
  },
  {
    item: "Real Time Monitor",
    category: "Sentinel",
    created: "2026-03-01 12:12:00",
    modified: "2026-03-01 12:12:00",
  },
] as const;

const STATUS_OPTIONS = ["All", "Open", "Parked", "Completed", "Error"] as const;
const SHOW_OPTIONS = [10, 25, 50] as const;

export function PlanProducts() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number] | null>(null);
  const [show, setShow] = useState<(typeof SHOW_OPTIONS)[number]>(10);
  const statusRef = useRef<HTMLDivElement>(null);
  const showRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (statusRef.current && !statusRef.current.contains(target)) setStatusOpen(false);
      if (showRef.current && !showRef.current.contains(target)) setShowOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <section className="card max-[1199px]:overflow-x-clip">
      <div className="mb-4 flex flex-col gap-3 min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:items-center min-[768px]:justify-between">
        <h2 className="text-xl font-medium text-roam-navy">Subscription Plan Products</h2>
        <div className="flex w-full items-center justify-between gap-5 min-[768px]:w-auto min-[768px]:justify-start">
          <button
            type="button"
            className="group inline-flex h-11 items-center justify-center text-[#878e9f] transition-colors hover:text-roam-teal active:text-[#007f89]"
          >
            <span className="inline-flex h-9 items-center justify-center gap-2 rounded-md border-[1.5px] border-[#e5e7eb] bg-[#f9fafb] pl-3 pr-2 text-sm font-medium transition-colors group-hover:border-[#bfecef] group-hover:bg-[#d8f4f6] group-active:border-[#8edce1] group-active:bg-[#c7eef1] group-active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)]">
              Modify Plan
              <span
                aria-hidden
                className="inline-block size-4 shrink-0 bg-current"
                style={{
                  WebkitMaskImage: "url(/assets/icon-pencil-ghost.svg)",
                  maskImage: "url(/assets/icon-pencil-ghost.svg)",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </span>
          </button>
          <div ref={statusRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setStatusOpen((v) => !v);
                setShowOpen(false);
              }}
              className="inline-flex h-9 w-[7.25rem] items-center justify-center gap-1.5 rounded-md border-[1.5px] border-[#e5e7eb] bg-transparent px-2 text-xs font-medium text-[#9ca3af]"
            >
              <span className="truncate">{status ?? "Status"}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/funnel.svg"
                alt=""
                width={14}
                height={8}
                className="shrink-0"
                style={{ width: 13.75, height: 7.5 }}
              />
            </button>
            {statusOpen ? (
              <div className="absolute right-0 top-[calc(100%+4px)] z-20 min-w-[140px] bg-white py-1 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setStatus(opt);
                      setStatusOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-xs hover:bg-[rgba(0,58,93,0.1)] ${
                      status === opt ? "font-medium text-roam-navy" : "text-[#6b758b]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <TableHScroll>
        <table className="w-full min-w-[560px] table-fixed text-left text-sm">
          <thead>
            <tr className="border-b-[0.6px] border-[#d7d7d7] text-sm font-bold tracking-[0.6px] text-[#666]">
              <th className="w-[26%] whitespace-nowrap px-1 py-3 font-bold">Item</th>
              <th className="w-[22%] whitespace-nowrap px-1 py-3 text-center font-bold">Category</th>
              <th className="w-[26%] whitespace-nowrap px-1 py-3 text-center font-bold">Created</th>
              <th className="w-[26%] whitespace-nowrap px-1 py-3 text-right font-bold">Modified</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.item} className="border-b-[0.6px] border-[#d7d7d7] text-[#666]">
                <td className="truncate px-1 py-3">{row.item}</td>
                <td className="truncate px-1 py-3 text-center">{row.category}</td>
                <td className="px-1 py-3 text-center uppercase whitespace-nowrap">{row.created}</td>
                <td className="px-1 py-3 text-right uppercase whitespace-nowrap">{row.modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableHScroll>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#9ca3af]">
        <span>1 of 1</span>
        <div className="flex items-center gap-4">
          <div ref={showRef} className="relative inline-flex items-center gap-2">
            <span>Show:</span>
            <button
              type="button"
              onClick={() => {
                setShowOpen((v) => !v);
                setStatusOpen(false);
              }}
              className="inline-flex items-center gap-1 rounded border border-roam-border bg-white px-2 py-1 text-xs text-[#666]"
            >
              {show}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/caret-down.svg" alt="" width={12} height={12} className="size-3 opacity-60" />
            </button>
            {showOpen ? (
              <div className="absolute bottom-[calc(100%+4px)] left-[2.5rem] z-20 min-w-[64px] bg-white py-1 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                {SHOW_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setShow(n);
                      setShowOpen(false);
                    }}
                    className={`block w-full px-3 py-2 text-left text-xs hover:bg-[rgba(0,58,93,0.1)] ${
                      show === n ? "font-medium text-roam-navy" : "text-[#6b758b]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/pagination-first.svg" alt="" width={16} height={16} className="size-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/pagination-prev.svg" alt="" width={16} height={16} className="size-4" />
            <span className="px-1.5 text-[#666]">1</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/pagination-next.svg" alt="" width={16} height={16} className="size-4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/pagination-last.svg" alt="" width={16} height={16} className="size-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
