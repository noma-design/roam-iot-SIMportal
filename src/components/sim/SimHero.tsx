import { TonalButton } from "@/components/ui/TonalButton";

const ACTIONS = [
  { label: "HLR Profile", icon: "/assets/icon-hlr.svg" },
  { label: "View Map", icon: "/assets/icon-map.svg" },
  { label: "SMS Logs", icon: "/assets/icon-sms-logs.svg" },
  { label: "Sessions", icon: "/assets/icon-sessions.svg" },
] as const;

export function SimHero({ iccid = "89901123456789012345" }: { iccid?: string }) {
  return (
    <section className="card relative mb-6 flex flex-col gap-6 overflow-hidden border-l-8 border-l-[#00ADBA] min-[768px]:flex-row min-[768px]:items-center min-[768px]:gap-6 min-[1200px]:gap-[48px] min-[1200px]:overflow-visible">
      <div className="flex min-w-0 flex-1 items-center gap-3 min-[1200px]:border-r min-[1200px]:border-roam-border-table min-[1200px]:pr-[30px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/sim-card.png?v=2"
          alt="SIM card"
          width={60}
          height={95}
          className="h-[95px] w-[60px] shrink-0"
        />
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-0.5 min-[1200px]:justify-between min-[1200px]:self-stretch">
          <div className="flex flex-nowrap items-center gap-2 min-[1200px]:flex-wrap min-[1200px]:items-start min-[1200px]:gap-[60px]">
            <h1 className="min-w-0 whitespace-nowrap text-[17px] font-semibold leading-none text-[#666] min-[768px]:text-[20px] min-[1200px]:text-[32px]">
              {iccid}
            </h1>
            <span className="shrink-0 rounded bg-[#e8f8ef] px-2 py-0.5 text-xs font-medium text-[#1f9d55]">
              Active
            </span>
          </div>

          {/* Desktop: subscription + last session on one line */}
          <div className="hidden flex-wrap items-center gap-2 text-sm text-[#666] min-[1200px]:flex">
            <p className="whitespace-nowrap">Active subscription, but no active session</p>
            <p className="whitespace-pre">•  Last Session: 02 March 2026, 15:02:20</p>
          </div>

          {/* Tablet/mobile — equal gaps between the three detail rows */}
          <div className="flex flex-col gap-1 min-[1200px]:hidden">
            <p className="text-sm text-[#666]">Active subscription, but no active session</p>
            <div className="flex flex-wrap items-center gap-1">
              <p className="text-xs text-[#9ca3af]">Last Session:</p>
              <p className="text-sm leading-5 text-[#666]">02 March 2026, 15:02:20</p>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <p className="text-xs text-[#9ca3af]">Last Known Location:</p>
              <p className="text-sm leading-5 text-[#666]">United Kingdom</p>
            </div>
          </div>

          {/* Desktop location */}
          <div className="hidden flex-wrap items-center gap-1 min-[1200px]:flex">
            <p className="text-xs text-[#9ca3af]">Last Known Location:</p>
            <p className="text-sm leading-5 text-[#666]">United Kingdom</p>
          </div>
        </div>
      </div>

      {/* Shorter divider on tablet */}
      <div
        aria-hidden
        className="hidden w-px shrink-0 self-center bg-roam-border-table min-[768px]:ml-2 min-[768px]:block min-[768px]:h-16 min-[1200px]:hidden"
      />

      <div className="grid w-full grid-cols-2 gap-3 min-[768px]:w-[268px] min-[768px]:shrink-0">
        {ACTIONS.map((action) => (
          <TonalButton
            key={action.label}
            label={action.label}
            iconSrc={action.icon}
            className="w-full"
          />
        ))}
      </div>
    </section>
  );
}
