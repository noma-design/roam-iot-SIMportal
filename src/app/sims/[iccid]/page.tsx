"use client";

import { useParams } from "next/navigation";
import { SimDetailsPage } from "@/components/sim/SimDetailsPage";

export default function SimDetailsRoute() {
  const params = useParams<{ iccid: string }>();
  const iccid = params.iccid ?? "89901123456789012345";
  return <SimDetailsPage iccid={iccid} />;
}
