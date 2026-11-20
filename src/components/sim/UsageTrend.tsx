"use client";

import { useEffect, useRef, useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { GHOST_BTN, MaskIcon } from "@/components/ui/MaskIcon";
import { UsageTrendChart } from "./UsageTrendChart";

const METRICS = [
  { key: "volume", label: "Data Volume (MB)", mark: "square" as const, color: "bg-[#00ADBA]" },
  {
    key: "average",
    label: "Average Data Volume (MB)",
    mark: "line" as const,
    color: "bg-[#1c84c6]",
  },
] as const;

export function UsageTrend() {
  const [range, setRange] = useState("Daily");
  const [metricOpen, setMetricOpen] = useState<string | null>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (metricOpen === null) return;
    function onDocClick(e: MouseEvent) {
      if (metricsRef.current && !metricsRef.current.contains(e.target as Node)) {
        setMetricOpen(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [metricOpen]);

  return (
    <section className="card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-medium text-roam-navy">Usage Trend</h2>
        <SegmentedControl
          options={["Daily", "Monthly", "Yearly"]}
          value={range}
          onChange={setRange}
        />
      </div>

      <div className="grid gap-6 min-[1200px]:grid-cols-[1fr_220px]">
        <div>
          <div
            ref={metricsRef}
            className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs leading-none text-roam-muted"
          >
            {METRICS.map((metric) => (
              <div key={metric.key} className="relative flex items-center">
                <button
                  type="button"
                  onClick={() =>
                    setMetricOpen((prev) => (prev === metric.key ? null : metric.key))
                  }
                  className="inline-flex h-4 items-center gap-1.5"
                >
                  <span
                    className={`inline-flex h-2.5 shrink-0 items-center justify-center ${
                      metric.mark === "line" ? "w-[21px]" : "w-2.5"
                    }`}
                  >
                    {metric.mark === "line" ? (
                      <span className={`block h-[3px] w-[21px] rounded-full ${metric.color}`} />
                    ) : (
                      <span className={`block size-2.5 rounded-sm ${metric.color}`} />
                    )}
                  </span>
                  <span className="leading-none">{metric.label}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/funnel.svg"
                    alt=""
                    width={14}
                    height={8}
                    className={`block shrink-0 transition-transform ${
                      metricOpen === metric.key ? "rotate-180" : ""
                    }`}
                    style={{ width: 13.75, height: 7.5 }}
                  />
                </button>
                {metricOpen === metric.key ? (
                  <div className="absolute left-0 top-[calc(100%+4px)] z-20 min-w-[160px] bg-white py-1 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                    {["Data Volume (MB)", "SMS Count", "Voice Minutes"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setMetricOpen(null)}
                        className="block w-full px-3 py-2 text-left text-xs text-[#6b758b] hover:bg-[rgba(0,58,93,0.1)]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <UsageTrendChart />
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            className={`${GHOST_BTN} w-auto self-start text-xs min-[1200px]:w-full`}
          >
            <MaskIcon src="/assets/download.svg" size={16} />
            Export Report
          </button>
          <div className="grid grid-cols-1 gap-4 min-[768px]:grid-cols-3 min-[1200px]:grid-cols-1">
            <Stat label="Data volume this year" value="851.22 MB" delta="+100%" up />
            <Stat label="Data volume this month" value="10 MB" delta="-3.5%" up={false} />
            <Stat label="Data volume today" value="3 MB" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  delta,
  up,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-lg border border-roam-border-table p-3">
      <p className="mb-1 text-xs text-roam-muted">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold text-[#666666]">{value}</p>
        {delta ? (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium ${
              up ? "text-[#1f9d55]" : "text-roam-danger"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={up ? "/assets/trend-up.svg" : "/assets/trend-down.svg"}
              alt=""
              width={12}
              height={12}
            />
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
