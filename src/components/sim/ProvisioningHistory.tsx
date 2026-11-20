"use client";

import { useEffect, useRef, useState } from "react";
import { TableHScroll } from "@/components/ui/TableHScroll";

const STATUS_OPTIONS = ["All", "Open", "Parked", "Completed", "Error"] as const;
const SHOW_OPTIONS = [10, 25, 50] as const;

export function ProvisioningHistory({ className = "" }: { className?: string }) {
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
    <section className={`card flex flex-col max-[1199px]:overflow-x-clip ${className}`.trim()}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-medium text-roam-navy">Provisioning History</h2>
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

      <TableHScroll className="min-h-0 flex-1">
        <table className="w-full min-w-[720px] table-fixed text-left text-sm">
          <thead>
            <tr className="border-b-[0.6px] border-[#d7d7d7] text-sm font-bold tracking-[0.6px] text-[#666]">
              <th className="w-[20%] whitespace-nowrap px-1 py-3 font-bold">Order ID</th>
              <th className="w-[20%] whitespace-nowrap px-1 py-3 text-center font-bold">
                Flow Name
              </th>
              <th className="w-[20%] whitespace-nowrap px-1 py-3 text-center font-bold">Status</th>
              <th className="w-[20%] whitespace-nowrap px-1 py-3 text-center font-bold">Created</th>
              <th className="w-[20%] whitespace-nowrap px-1 py-3 text-right font-bold">User ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="py-10 text-center text-sm text-[#9ca3af]">
                No data
              </td>
            </tr>
          </tbody>
        </table>
      </TableHScroll>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4 text-xs text-[#9ca3af]">
        <span>0 of 0</span>
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
