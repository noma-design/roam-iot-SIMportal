"use client";

import { useEffect, useRef, useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useFinePointer } from "@/hooks/useFinePointer";

const METRICS = [
  {
    label: "Data Sessions",
    value: "6",
    sub: "Data Sessions",
    tip: "The number of data sessions of the entire SIM estate in the selected period.",
  },
  {
    label: "Data Volume",
    value: "3 MB",
    sub: "Total Data Volume",
    tip: "The amount of megabytes consumed in the selected period.",
  },
  {
    label: "Alerts",
    value: "0",
    sub: "Total Alerts",
    tip: "The number of alerts such as fencing alerts, IMEI alerts etc., in the selected period.",
  },
  {
    label: "Zero Sessions",
    value: "2",
    sub: "Total Zero Sessions",
    tip: "The amount of connections which yielded no traffic.",
  },
] as const;

export function UsageSummary() {
  const [range, setRange] = useState("Daily");
  const [openTip, setOpenTip] = useState<string | null>(null);
  const finePointer = useFinePointer();
  const tipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (finePointer || openTip === null) return;
    function onDocClick(e: MouseEvent) {
      if (tipsRef.current && !tipsRef.current.contains(e.target as Node)) {
        setOpenTip(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [finePointer, openTip]);

  return (
    <section className="mb-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-medium text-roam-navy">Usage Summary</h2>
        <SegmentedControl
          options={["Daily", "Monthly", "Yearly"]}
          value={range}
          onChange={setRange}
        />
      </div>
      <div
        ref={tipsRef}
        className="grid grid-cols-2 gap-4 min-[768px]:grid-cols-4"
      >
        {METRICS.map((metric) => {
          const showTip = openTip === metric.label;
          return (
            <article key={metric.label} className="card flex flex-col gap-2">
              <div className="relative flex items-center gap-2">
                <span className="text-xs text-[#666]">{metric.label}</span>
                <button
                  type="button"
                  aria-label={`${metric.label} info`}
                  className="relative size-3 shrink-0"
                  onMouseEnter={() => {
                    if (finePointer) setOpenTip(metric.label);
                  }}
                  onMouseLeave={() => {
                    if (finePointer) setOpenTip(null);
                  }}
                  onFocus={() => {
                    if (finePointer) setOpenTip(metric.label);
                  }}
                  onBlur={() => {
                    if (finePointer) setOpenTip(null);
                  }}
                  onClick={() => {
                    if (!finePointer) {
                      setOpenTip((prev) => (prev === metric.label ? null : metric.label));
                    }
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={showTip ? "/assets/info-hover.svg" : "/assets/info.svg"}
                    alt=""
                    width={12}
                    height={12}
                    className="size-3"
                  />
                </button>
                {showTip ? (
                  <div className="absolute bottom-[calc(100%+4px)] left-0 z-20 flex w-40 flex-col items-center">
                    <div className="rounded-sm bg-[#425161] p-2 text-center text-[11px] font-semibold leading-3 text-white">
                      {metric.tip}
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/tooltip-angle.svg"
                      alt=""
                      width={10}
                      height={4}
                      className="h-1 w-2.5"
                    />
                  </div>
                ) : null}
              </div>
              <p className="text-[28px] font-semibold leading-none text-roam-navy min-[1200px]:text-[32px]">
                {metric.value}
              </p>
              <p className="text-xs text-[#9ca3af]">{metric.sub}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
