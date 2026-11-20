import Link from "next/link";

export function MonthlyUsageMonitor({
  sentinelHref = "/sims/89901123456789012345/sentinel",
}: {
  sentinelHref?: string;
}) {
  return (
    <section className="card flex flex-col justify-between gap-5 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-roam-navy">Monthly Usage Monitor</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#666]">Zones 1 - 2</span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <span className="text-xs leading-4 text-[#676a6c]">Current Consumption</span>
            <span className="text-xs font-bold leading-4 text-[#dc2626]">86.4%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-[3px] bg-black/10">
            <div
              className="h-full rounded-[3px] bg-gradient-to-r from-[#22c55e] via-[#f59e0b] to-[#dc2626]"
              style={{ width: "86.4%" }}
            />
          </div>
          <p className="text-right text-xs font-medium leading-4 text-[#dc2626]">
            13.6 MB remaining
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-[0.6px] text-[#9ca3af]">
              Data Allowance
            </span>
            <span className="text-2xl font-medium text-[#666]">100 MB</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-[1px] text-[#9ca3af]">
              Watchdog Status
            </span>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.6px] text-[#666]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/icon-enabled.svg" alt="" width={16} height={16} className="size-4" />
              Enabled
            </span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-xs uppercase tracking-[1px] text-[#9ca3af]">Action</span>
            <span className="text-xs font-medium uppercase tracking-[0.6px] text-[#666]">
              Live cut off
            </span>
          </div>
        </div>

        <Link
          href={sentinelHref}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-roam-navy bg-white px-5 py-2.5 text-sm font-medium text-roam-navy shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-roam-surface-soft min-[768px]:w-auto min-[768px]:self-end min-[1200px]:w-full min-[1200px]:self-auto"
        >
          Manage Sentinel
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/arrow-right-navy.svg"
            alt=""
            width={20}
            height={20}
            className="size-5"
          />
        </Link>
      </div>
    </section>
  );
}
