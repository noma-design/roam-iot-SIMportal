import { Suspense } from "react";
import { SentinelPage } from "@/components/sentinel/SentinelPage";

type SentinelRouteProps = {
  params: Promise<{ iccid: string }>;
};

async function SentinelContent({ params }: SentinelRouteProps) {
  const { iccid } = await params;
  return <SentinelPage iccid={iccid || "89901123456789012345"} />;
}

export default function SentinelRoute({ params }: SentinelRouteProps) {
  return (
    <Suspense fallback={null}>
      <SentinelContent params={params} />
    </Suspense>
  );
}
