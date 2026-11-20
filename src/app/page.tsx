import { SimDetailsPage } from "@/components/sim/SimDetailsPage";

const DEFAULT_ICCID = "89901123456789012345";

export default function Home() {
  return <SimDetailsPage iccid={DEFAULT_ICCID} />;
}
