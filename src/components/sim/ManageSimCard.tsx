"use client";

import { GHOST_BTN, MaskIcon } from "@/components/ui/MaskIcon";

const GHOST_ACTIONS = [
  { label: "Send SMS", icon: "/assets/icon-sms.svg" },
  { label: "Re-register", icon: "/assets/icon-reregister.svg" },
  { label: "Edit Metadata", icon: "/assets/icon-pencil-ghost.svg" },
  { label: "IMEI Lock", icon: "/assets/icon-imei-lock.svg" },
] as const;

export function ManageSimCard() {
  return (
    <section className="card py-6">
      <h2 className="mb-4 text-xl font-medium text-roam-navy">Manage SIM</h2>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2 border-b border-[#d7d7d7] pb-3">
          {GHOST_ACTIONS.map((action) => (
            <button key={action.label} type="button" className={GHOST_BTN}>
              <span>{action.label}</span>
              <MaskIcon src={action.icon} />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="inline-flex h-[44px] items-center justify-center gap-2 rounded-md border border-[#f8ac59] bg-[#f8ac59] px-5 text-[15px] font-medium text-white shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition-colors hover:brightness-95 active:brightness-90"
          >
            Suspend
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/pause-white.svg" alt="" width={20} height={20} className="size-5" />
          </button>
          <button
            type="button"
            className="inline-flex h-[44px] items-center justify-center gap-2 rounded-md border border-[#dc2626] bg-[#dc2626] px-5 text-[15px] font-medium text-white shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition-colors hover:brightness-95 active:brightness-90"
          >
            Terminate
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/terminate-white.svg"
              alt=""
              width={20}
              height={20}
              className="size-5"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
