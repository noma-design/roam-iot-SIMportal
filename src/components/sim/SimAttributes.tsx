const ATTRIBUTES = [
  ["IMSI", "310123456789012"],
  ["MSISDN", "+44 7700 900123"],
  ["IMEI", "350000001234567"],
  ["APN", "roam.global"],
  ["SUBSCRIPTION PLAN", "HW Unlimited Z4"],
  ["ROBOT ID NUMBER (RIN)", "NX-03194"],
  ["CELL ID", "2844101"],
  ["IP ADDRESS", "10.0.8.123"],
  ["NETWORK", "Stellar - UK"],
  ["MCC-MNC", "999-01"],
] as const;

export function SimAttributes({ className = "" }: { className?: string }) {
  return (
    <section className={`card flex flex-col py-6 ${className}`.trim()}>
      <h2 className="mb-4 text-xl font-medium text-roam-navy">SIM Attributes</h2>
      <dl className="flex min-h-0 flex-1 flex-col justify-start gap-2 self-stretch">
        {ATTRIBUTES.map(([label, value]) => (
          <div
            key={label}
            className="flex h-9 w-full items-center justify-between gap-4"
          >
            <dt className="shrink-0 text-xs uppercase tracking-[1px] text-[#9ca3af]">
              {label}
            </dt>
            <dd className="text-right text-sm font-medium text-[#666]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
