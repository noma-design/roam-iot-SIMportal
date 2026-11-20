import { PortalShell } from "@/components/layout/PortalShell";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ManageSimCard } from "./ManageSimCard";
import { MonthlyUsageMonitor } from "./MonthlyUsageMonitor";
import { PlanProducts } from "./PlanProducts";
import { ProvisioningHistory } from "./ProvisioningHistory";
import { SimAttributes } from "./SimAttributes";
import { SimHero } from "./SimHero";
import { UsageSummary } from "./UsageSummary";
import { UsageTrend } from "./UsageTrend";

export function SimDetailsPage({ iccid }: { iccid: string }) {
  return (
    <PortalShell activeNav="SIMs">
      <Breadcrumb
        items={[
          { label: "SIM", href: "/sims" },
          { label: "SIM Details" },
        ]}
      />
      <SimHero iccid={iccid} />
      <UsageSummary />
      <div className="grid grid-cols-1 items-stretch gap-6 min-[1200px]:grid-cols-[minmax(280px,424px)_1fr]">
        <div className="flex flex-col gap-6 min-[1200px]:h-full">
          <ManageSimCard />
          <MonthlyUsageMonitor sentinelHref={`/sims/${iccid}/sentinel`} />
          <SimAttributes className="min-[1200px]:flex-1" />
        </div>
        <div className="flex flex-col gap-6 min-[1200px]:h-full">
          <UsageTrend />
          <PlanProducts />
          <ProvisioningHistory className="min-[1200px]:flex-1" />
        </div>
      </div>
    </PortalShell>
  );
}
