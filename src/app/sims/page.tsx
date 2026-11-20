import { SimDetailsPage } from "@/components/sim/SimDetailsPage";

const DEFAULT_ICCID = "89901123456789012345";

export default function SimsIndex() {
  return <SimDetailsPage iccid={DEFAULT_ICCID} />;
}
