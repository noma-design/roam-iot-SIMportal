"use client";

import { useParams } from "next/navigation";
import { SentinelPage } from "@/components/sentinel/SentinelPage";

export default function SentinelRoute() {
  const params = useParams<{ iccid: string }>();
  const iccid = params.iccid ?? "89901123456789012345";
  return <SentinelPage iccid={iccid} />;
}
