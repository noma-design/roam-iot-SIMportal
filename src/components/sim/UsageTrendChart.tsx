"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { useIsMobile } from "@/hooks/useIsMobile";

const POINTS = [
  { label: "Feb 06", volume: 440, average: 95 },
  { label: "Feb 09", volume: 35, average: 100 },
  { label: "Feb 12", volume: 670, average: 128 },
  { label: "Feb 15", volume: 105, average: 100 },
  { label: "Feb 18", volume: 155, average: 110 },
  { label: "Feb 21", volume: 680, average: 400 },
  { label: "Feb 24", volume: 95, average: 115 },
  { label: "Feb 27", volume: 110, average: 100 },
  { label: "Mar 02", volume: 125, average: 105 },
] as const;

const MAX_Y = 700;
const Y_TICKS = [0, 100, 200, 300, 400, 500, 600, 700];

const DESKTOP = {
  W: 628,
  H: 298,
  PAD: { top: 12, right: 28, bottom: 28, left: 36 },
  fontSize: 14,
  barMax: 28,
} as const;

const MOBILE = {
  W: 390,
  H: 320,
  PAD: { top: 10, right: 10, bottom: 40, left: 34 },
  fontSize: 12,
  barMax: 22,
} as const;

function tooltipTransform(i: number, count: number) {
  if (i <= 1) return "translate(0, calc(-100% - 10px))";
  if (i >= count - 2) return "translate(-100%, calc(-100% - 10px))";
  return "translate(-50%, calc(-100% - 10px))";
}

export function UsageTrendChart() {
  const [active, setActive] = useState<number | null>(null);
  const finePointer = useFinePointer();
  const isMobile = useIsMobile();
  const rootRef = useRef<HTMLDivElement>(null);

  const cfg = isMobile ? MOBILE : DESKTOP;
  const { W, H, PAD, fontSize, barMax } = cfg;
  const CHART_W = W - PAD.left - PAD.right;
  const CHART_H = H - PAD.top - PAD.bottom;
  const barW = Math.min(barMax, (CHART_W / POINTS.length) * 0.45);

  function yScale(v: number) {
    return PAD.top + CHART_H - (v / MAX_Y) * CHART_H;
  }

  function xCenter(i: number) {
    const step = CHART_W / POINTS.length;
    return PAD.left + step * i + step / 2;
  }

  function areaPath() {
    const first = `M ${xCenter(0)} ${yScale(POINTS[0].average)}`;
    const line = POINTS.map((p, i) => `L ${xCenter(i)} ${yScale(p.average)}`).join(" ");
    const close = `L ${xCenter(POINTS.length - 1)} ${yScale(0)} L ${xCenter(0)} ${yScale(0)} Z`;
    return `${first} ${line.slice(2)} ${close}`;
  }

  function linePath() {
    return POINTS.map((p, i) => `${i === 0 ? "M" : "L"} ${xCenter(i)} ${yScale(p.average)}`).join(
      " ",
    );
  }

  useEffect(() => {
    if (finePointer || active === null) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [finePointer, active]);

  function selectPoint(i: number) {
    if (finePointer) {
      setActive(i);
      return;
    }
    setActive((prev) => (prev === i ? null : i));
  }

  return (
    <div
      ref={rootRef}
      className="relative w-full select-none overflow-hidden bg-white max-[767px]:min-h-[280px]"
      onMouseLeave={() => {
        if (finePointer) setActive(null);
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full max-[767px]:min-h-[280px]"
        role="img"
        aria-label="Usage trend"
        preserveAspectRatio="xMidYMid meet"
      >
        {Y_TICKS.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke="#e5e7eb"
              strokeWidth={0.87}
              strokeDasharray="4 4"
            />
            <text
              x={PAD.left - 6}
              y={yScale(tick) + 4}
              textAnchor="end"
              className="fill-[#666]"
              style={{ fontSize, letterSpacing: "-0.3px" }}
            >
              {tick}
            </text>
          </g>
        ))}

        {POINTS.map((p, i) => {
          const cx = xCenter(i);
          const isActive = active === i;
          const barH = (p.volume / MAX_Y) * CHART_H;
          return (
            <rect
              key={`bar-${p.label}`}
              x={cx - barW / 2}
              y={yScale(p.volume)}
              width={barW}
              height={barH}
              rx={2}
              fill="#00ADBA"
              className="pointer-events-none transition-[opacity,filter] duration-150"
              style={{
                opacity: active === null || isActive ? 1 : 0.35,
                filter: isActive ? "brightness(1.05)" : undefined,
              }}
            />
          );
        })}

        <path d={areaPath()} fill="rgba(90,150,190,0.22)" className="pointer-events-none" />
        <path
          d={linePath()}
          fill="none"
          stroke="#1c84c6"
          strokeWidth={2}
          className="pointer-events-none"
        />

        {POINTS.map((p, i) => {
          const cx = xCenter(i);
          const isActive = active === i;
          const step = CHART_W / POINTS.length;
          return (
            <g key={p.label}>
              <circle
                cx={cx}
                cy={yScale(p.average)}
                r={isActive ? 5 : 3.5}
                fill="#fff"
                stroke="#1c84c6"
                strokeWidth={2}
                className="pointer-events-none transition-all duration-150"
              />
              <text
                x={cx}
                y={H - 10}
                textAnchor="middle"
                className="fill-[#666] pointer-events-none"
                style={{ fontSize: isMobile ? 10 : fontSize, letterSpacing: "-0.3px" }}
              >
                {p.label}
              </text>
              <rect
                x={cx - step / 2}
                y={PAD.top}
                width={step}
                height={CHART_H}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => {
                  if (finePointer) setActive(i);
                }}
                onFocus={() => {
                  if (finePointer) setActive(i);
                }}
                onClick={() => selectPoint(i)}
              />
              {isActive ? (
                <line
                  x1={cx}
                  x2={cx}
                  y1={PAD.top}
                  y2={PAD.top + CHART_H}
                  stroke="#9ca3af"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  className="pointer-events-none"
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {active !== null ? (
        <div
          className="pointer-events-none absolute z-10 flex w-max max-w-[min(220px,calc(100%-8px))] flex-col gap-1 rounded-[10px] border border-[#e5e7eb] bg-white p-2 shadow-sm"
          style={{
            left: `${(xCenter(active) / W) * 100}%`,
            top: `${(Math.min(yScale(POINTS[active].volume), yScale(POINTS[active].average)) / H) * 100}%`,
            transform: tooltipTransform(active, POINTS.length),
          }}
        >
          <p className="whitespace-nowrap text-xs font-medium tracking-[-0.15px] text-[#666]">
            {POINTS[active].label}
          </p>
          <div className="flex h-4 items-center gap-1 whitespace-nowrap">
            <span className="size-2 shrink-0 rounded-[2px] bg-[#00ADBA]" />
            <span className="text-xs text-[#666]">Data volume:</span>
            <span className="text-xs font-medium text-[#666]">
              {POINTS[active].volume} MB
            </span>
          </div>
          <div className="flex h-4 items-center gap-1 whitespace-nowrap">
            <span className="h-0.5 w-2 shrink-0 bg-[#1c84c6]" />
            <span className="text-xs text-[#666]">Average Data volume:</span>
            <span className="text-xs font-medium text-[#666]">
              {POINTS[active].average} MB
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
