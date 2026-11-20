"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PortalShell } from "@/components/layout/PortalShell";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GHOST_BTN, MaskIcon } from "@/components/ui/MaskIcon";
import { TableHScroll } from "@/components/ui/TableHScroll";
import { TonalButton } from "@/components/ui/TonalButton";
import { AddEmailModal } from "./AddEmailModal";
import { AddUrlModal } from "./AddUrlModal";

const CONFIG = [
  {
    label: "Sentinel Type",
    value: "Real Time Monitor",
    icon: "/assets/sentinel/cfg-sentinel-type.svg",
  },
  {
    label: "Unit Type",
    value: "Megabyte",
    icon: "/assets/sentinel/cfg-unit-type.svg",
  },
  {
    label: "Amount",
    value: "100 MB",
    icon: "/assets/sentinel/cfg-amount.svg",
  },
  {
    label: "Action Type",
    value: "Suspend",
    icon: "/assets/sentinel/cfg-action-type.svg",
  },
  {
    label: "Suspend Interval",
    value: "1 Day",
    icon: "/assets/sentinel/cfg-suspend.svg",
  },
  {
    label: "Coverage Zone",
    value: "Zones 1-9",
    icon: "/assets/sentinel/cfg-coverage.svg",
  },
  {
    label: "Data Reset Cycle",
    value: "1 Month",
    icon: "/assets/sentinel/cfg-reset-cycle.svg",
  },
  {
    label: "Notification Type",
    value: "Email + SMS",
    icon: "/assets/sentinel/cfg-notification.svg",
  },
] as const;

const THRESHOLDS = [
  { type: "Warning 1", threshold: 25, status: "Triggered" as const },
  { type: "Warning 2", threshold: 65, status: "Triggered" as const },
  { type: "Warning 3", threshold: 86, status: "Waiting" as const },
  { type: "Max Limit", threshold: 100, status: "Waiting" as const },
];

const EVENTS = [
  ["ORD-8821", "Usage Cutoff", "Completed", "02 Mar 2026, 14:18", "system"],
  ["ORD-8790", "Threshold Alert", "Error", "01 Mar 2026, 09:42", "api.bot"],
  ["ORD-8712", "Reset Cycle", "Loading", "28 Feb 2026, 00:01", "scheduler"],
] as const;

const EVENT_STATUS_OPTIONS = ["All", "Completed", "Loading", "Error"] as const;
const SHOW_OPTIONS = [10, 25, 50] as const;

const TREND_BARS = [21, 8, 31, 31, 18, 4, 12];

function thresholdFill(pct: number) {
  if (pct >= 100) return "#dc2626";
  if (pct >= 86) return "linear-gradient(90deg, #22c55e 0%, #f59e0b 50%, #dc2626 100%)";
  if (pct >= 65) return "linear-gradient(90deg, #84cc16 0%, #f59e0b 100%)";
  return "#22c55e";
}

type SentinelPageProps = {
  iccid?: string;
};

export function SentinelPage({ iccid = "8944501000000000004" }: SentinelPageProps) {
  const [emails, setEmails] = useState(["hickleweigand@company.info"]);
  const [urls, setUrls] = useState(["hickleweigand.com"]);
  const [emailOpen, setEmailOpen] = useState(false);
  const [urlOpen, setUrlOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [status, setStatus] = useState<(typeof EVENT_STATUS_OPTIONS)[number] | null>(null);
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

  const filteredEvents =
    !status || status === "All" ? EVENTS : EVENTS.filter((row) => row[2] === status);

  return (
    <PortalShell activeNav="SIMs">
      <Breadcrumb
        items={[
          { label: "SIM", href: "/sims" },
          { label: "SIM Details", href: `/sims/${iccid}` },
          { label: "Sentinel" },
        ]}
      />

      <div className="mb-5 flex flex-col gap-4 min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:justify-between">
        <h1 className="w-full text-[17px] font-semibold leading-none text-[#666] min-[768px]:text-[20px] min-[1200px]:w-auto min-[1200px]:text-[32px]">
          ICCID: {iccid}
        </h1>
        {/* Tablet + desktop action row — hidden on mobile (buttons live in active banner) */}
        <div className="hidden w-full justify-end min-[768px]:flex min-[1200px]:w-auto">
          <div className="inline-grid grid-flow-col auto-cols-[1fr] gap-2">
            <TonalButton
              label="Add Sentinel"
              iconSrc="/assets/sentinel/icon-plus.svg"
              href=""
              className="!h-8 w-full !py-0"
            />
            <TonalButton
              label="Modify Sentinel"
              iconSrc="/assets/sentinel/icon-pencil.svg"
              href=""
              className="!h-8 w-full !py-0"
            />
            <RemoveSentinelButton />
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col rounded-lg border-[0.5px] border-[#00adba] bg-[rgba(0,173,186,0.05)] px-5 py-4 shadow-[0_0_2px_#00adba] min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between min-[768px]:gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,173,186,0.2)] p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/sentinel/icon-pulse.svg"
              alt=""
              width={24}
              height={24}
              className="size-6"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm leading-4 text-[#666]">Sentinel is active</p>
            <div className="flex items-center gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/sentinel/icon-arrows-clockwise.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
              <p className="text-xs leading-4 text-[#9ca3af]">Last updated: 2 minutes ago</p>
            </div>
          </div>
        </div>

        {/* Mobile: Add/Modify top, Reset/Remove bottom — equal width, right-aligned */}
        <div className="mt-6 flex w-full justify-end min-[768px]:hidden">
          <div className="inline-grid grid-cols-2 gap-2">
            <TonalButton
              label="Add Sentinel"
              iconSrc="/assets/sentinel/icon-plus.svg"
              href=""
              className="!h-8 w-full !py-0"
            />
            <TonalButton
              label="Modify Sentinel"
              iconSrc="/assets/sentinel/icon-pencil.svg"
              href=""
              className="!h-8 w-full !py-0"
            />
            <button type="button" className={`${GHOST_BTN} !h-8 w-full`}>
              Reset Count
              <MaskIcon src="/assets/sentinel/icon-reset.svg" size={16} />
            </button>
            <RemoveSentinelButton />
          </div>
        </div>

        {/* Tablet + desktop: Reset only in banner */}
        <button type="button" className={`${GHOST_BTN} !hidden !h-8 min-[768px]:!inline-flex`}>
          Reset Count
          <MaskIcon src="/assets/sentinel/icon-reset.svg" size={16} />
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 min-[1200px]:grid-cols-[minmax(280px,424px)_1fr]">
        {/* Active Monitor */}
        <section className="card relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[234px] right-[13px] size-40 rounded-xl bg-[rgba(0,173,186,0.05)] blur-[32px]"
          />
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className="text-xl font-medium text-roam-navy">Active Monitor</h2>
            <span className="inline-flex items-center justify-center rounded-full bg-[rgba(31,183,87,0.2)] px-2 py-1 text-[10px] font-semibold tracking-[0.5px] text-[#1fb757]">
              ENABLED
            </span>
          </div>
          <div className="mb-8 flex items-start gap-2 py-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/sentinel/icon-warning.svg"
              alt=""
              width={16}
              height={16}
              className="mt-0.5 size-4 shrink-0"
            />
            <p className="text-xs leading-4 text-[#666]">
              Sentinel is actively monitoring this SIM and will trigger action once usage exceeds
              configured thresholds.
            </p>
          </div>

          <div className="flex flex-col items-center border-b-[0.8px] border-[#d7d7d7] pb-3">
            <div className="relative flex size-[193px] items-center justify-center">
              <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 193 193" aria-hidden>
                <circle
                  cx="96.5"
                  cy="96.5"
                  r="78"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="18"
                />
                <circle
                  cx="96.5"
                  cy="96.5"
                  r="78"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="18"
                  strokeLinecap="butt"
                  strokeDasharray={`${2 * Math.PI * 78 * 0.864} ${2 * Math.PI * 78}`}
                />
              </svg>
              <div className="relative z-10 text-center text-[#666]">
                <p className="text-[32px] font-semibold leading-9 tracking-[-1.8px]">86.4</p>
                <p className="text-xs font-medium uppercase tracking-[1.2px]">MB USED</p>
              </div>
            </div>
            <div className="mt-6 flex w-full items-center justify-between text-sm">
              <span className="text-[#666]">Limit: 100.0 MB</span>
              <span className="text-[#dc2626]">13.6MB remaining</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-5">
              <p className="text-xs text-[#666]">Usage Trend (past 7 days)</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/sentinel/icon-trend-up.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
            </div>
            <div className="flex h-10 items-end gap-2 border-b border-[#dfedee] pb-px">
              {TREND_BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[2px] bg-[#dfedee]"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            <div className="rounded border-0 bg-[rgba(0,173,186,0.05)] p-3 text-xs shadow-[inset_0_0_0_0.5px_rgba(0,173,186,0.7)]">
              <p className="leading-4 text-[#dc2626]">~ 5 days until limit</p>
              <p className="leading-4 text-[#666]">Based on average daily average usage</p>
            </div>
          </div>
        </section>

        {/* Configuration Details */}
        <section className="card">
          <h2 className="mb-3 text-xl font-medium text-roam-navy">Configuration Details</h2>
          <div className="grid grid-cols-2 gap-4">
            {CONFIG.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-2 rounded-xl border border-[rgba(0,173,186,0.1)] bg-[#f8fbfb] px-5 py-3 shadow-[0_1px_1px_rgba(0,173,186,0.1)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt="" width={40} height={40} className="size-10" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-[0.6px] text-[#9ca3af]">{item.label}</p>
                  <p className="text-base font-semibold text-[#666]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 min-[1200px]:grid-cols-[minmax(280px,424px)_1fr]">
        {/* Recipients */}
        <section className="card">
          <h2 className="mb-4 text-xl font-medium text-roam-navy">Recipients</h2>
          <RecipientRow
            label="Email"
            items={emails}
            icon="/assets/sentinel/icon-envelope.svg"
            onRemove={(item) => setEmails((prev) => prev.filter((e) => e !== item))}
            onAdd={() => setEmailOpen(true)}
          />
          <RecipientRow
            label="URL"
            items={urls}
            icon="/assets/sentinel/icon-link.svg"
            bordered={false}
            onRemove={(item) => setUrls((prev) => prev.filter((u) => u !== item))}
            onAdd={() => setUrlOpen(true)}
          />
        </section>

        {/* Thresholds & Alerts */}
        <section className="card max-[1199px]:overflow-x-clip min-[1200px]:overflow-visible">
          <h2 className="mb-4 text-xl font-medium text-roam-navy">Thresholds & Alerts</h2>
          <TableHScroll>
            <table className="w-full min-w-[560px] table-fixed text-left text-sm">
              <thead>
                <tr className="border-b-[0.6px] border-[#d7d7d7] text-sm font-bold tracking-[0.6px] text-[#666]">
                  <th className="w-[25%] px-1 py-3 font-bold">Alert Type</th>
                  <th className="w-[25%] px-1 py-3 text-center font-bold">Threshold</th>
                  <th className="w-[25%] px-1 py-3 text-center font-bold">Status</th>
                  <th className="w-[25%] px-1 py-3 text-right font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {THRESHOLDS.map((row) => (
                  <tr key={row.type} className="border-b-[0.6px] border-[#d7d7d7] text-[#666]">
                    <td className="px-1 py-2.5">{row.type}</td>
                    <td className="px-1 py-2.5">
                      <div className="mx-auto flex w-[163px] max-w-full items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-[3px] bg-[rgba(120,120,120,0.2)]">
                          <div
                            className="h-full rounded-[3px]"
                            style={{
                              width: `${row.threshold}%`,
                              background: thresholdFill(row.threshold),
                            }}
                          />
                        </div>
                        <span className="shrink-0 text-xs">{row.threshold}%</span>
                      </div>
                    </td>
                    <td className="px-1 py-2.5 text-center">
                      <span
                        className={`inline-flex min-w-[4.75rem] items-center justify-center rounded px-2 py-1 text-xs capitalize ${
                          row.status === "Triggered"
                            ? "bg-[rgba(220,38,38,0.2)] text-[#dc2626]"
                            : "bg-[rgba(170,178,189,0.3)] text-[#666]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-1 py-2.5 text-right whitespace-nowrap">2026-03-01 12:12:00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableHScroll>
        </section>
      </div>

      {/* Recent Sentinel Events */}
      <section className="card max-[1199px]:overflow-x-clip">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-medium text-roam-navy">Recent Sentinel Events</h2>
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
                {EVENT_STATUS_OPTIONS.map((opt) => (
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

        <TableHScroll>
          <table className="w-full min-w-[720px] table-fixed text-left text-sm">
            <thead>
              <tr className="border-b-[0.6px] border-[#d7d7d7] text-sm font-bold tracking-[0.6px] text-[#666]">
                <th className="w-[20%] whitespace-nowrap px-1 py-3 font-bold">Order ID</th>
                <th className="w-[20%] whitespace-nowrap px-1 py-3 text-center font-bold">
                  Flow Name
                </th>
                <th className="w-[20%] whitespace-nowrap px-1 py-3 text-center font-bold">
                  Status
                </th>
                <th className="w-[20%] whitespace-nowrap px-1 py-3 text-center font-bold">
                  Created
                </th>
                <th className="w-[20%] whitespace-nowrap px-1 py-3 text-right font-bold">
                  User ID
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((row) => (
                <tr key={row[0]} className="border-b-[0.6px] border-[#d7d7d7]">
                  <td className="truncate px-1 py-3 text-roam-navy">{row[0]}</td>
                  <td className="truncate px-1 py-3 text-center text-roam-navy">{row[1]}</td>
                  <td
                    className={`px-1 py-3 text-center font-medium whitespace-nowrap ${
                      row[2] === "Completed"
                        ? "text-[#1f9d55]"
                        : row[2] === "Error"
                          ? "text-roam-danger"
                          : "text-roam-warn"
                    }`}
                  >
                    {row[2]}
                  </td>
                  <td className="px-1 py-3 text-center text-[#666] whitespace-nowrap">{row[3]}</td>
                  <td className="truncate px-1 py-3 text-right text-[#666]">{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableHScroll>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#9ca3af]">
          <span>1 of 3</span>
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
                <img
                  src="/assets/caret-down.svg"
                  alt=""
                  width={12}
                  height={12}
                  className="size-3 opacity-60"
                />
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
              <img
                src="/assets/pagination-first.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/pagination-prev.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
              <span className="px-1.5 text-[#666]">1</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/pagination-next.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/pagination-last.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
            </div>
          </div>
        </div>
      </section>

      <p className="mt-6 text-sm text-roam-muted">
        <Link href={`/sims/${iccid}`} className="text-roam-teal hover:underline">
          ← Back to SIM Details
        </Link>
      </p>

      <AddEmailModal
        open={emailOpen}
        onClose={() => setEmailOpen(false)}
        onAdd={(email) => setEmails((prev) => (prev.includes(email) ? prev : [...prev, email]))}
      />
      <AddUrlModal
        open={urlOpen}
        onClose={() => setUrlOpen(false)}
        onAdd={(url) => setUrls((prev) => (prev.includes(url) ? prev : [...prev, url]))}
      />
    </PortalShell>
  );
}

function RemoveSentinelButton() {
  return (
    <button
      type="button"
      className="group inline-flex h-8 w-full items-center justify-center gap-2 rounded-[6px] border border-[#dc2626] bg-white py-0 pl-3 pr-2 text-sm font-medium text-[#dc2626] transition-colors hover:border-[#f5a5a5] hover:bg-[#fde8e8] hover:text-[#dc2626] active:border-[#f08080] active:bg-[#fad1d1] active:text-[#b91c1c] active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)]"
    >
      Remove Sentinel
      <MaskIcon
        src="/assets/sentinel/icon-trash.svg"
        size={16}
        className="text-[#dc2626] group-active:text-[#b91c1c]"
      />
    </button>
  );
}

function RecipientRow({
  label,
  items,
  icon,
  onRemove,
  onAdd,
  bordered = true,
}: {
  label: string;
  items: string[];
  icon: string;
  onRemove: (item: string) => void;
  onAdd: () => void;
  bordered?: boolean;
}) {
  return (
    <div className={`mb-4 last:mb-0 ${bordered ? "border-b-[0.6px] border-[#d7d7d7] pb-3" : ""}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.6px] text-[#666]">{label}</p>
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 rounded-xl border border-[#244747] bg-roam-navy px-[13px] py-[5px] text-xs font-medium text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon} alt="" width={16} height={16} className="size-4 shrink-0" />
            {item}
            <button
              type="button"
              aria-label={`Remove ${item}`}
              onClick={() => onRemove(item)}
              className="text-white/80 hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add ${label}`}
          className="inline-flex items-center justify-center rounded-[3px] border border-roam-navy bg-white p-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/sentinel/icon-plus-navy.svg"
            alt=""
            width={20}
            height={20}
            className="size-5"
          />
        </button>
      </div>
    </div>
  );
}
