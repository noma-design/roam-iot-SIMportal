import { Suspense } from "react";
import { SimDetailsPage } from "@/components/sim/SimDetailsPage";

type SimDetailsRouteProps = {
  params: Promise<{ iccid: string }>;
};

async function SimDetailsContent({ params }: SimDetailsRouteProps) {
  const { iccid } = await params;
  return <SimDetailsPage iccid={iccid || "89901123456789012345"} />;
}

export default function SimDetailsRoute({ params }: SimDetailsRouteProps) {
  return (
    <Suspense fallback={null}>
      <SimDetailsContent params={params} />
    </Suspense>
  );
}
