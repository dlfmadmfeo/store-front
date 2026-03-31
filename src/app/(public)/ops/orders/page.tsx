import dynamic from "next/dynamic";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";

const OrderOperationsPage = dynamic(() => import("@/domains/operations/OrderOperationsPage"), {
  loading: () => (
    <div className="bg-[#f4f7fb] px-3 py-6 sm:px-4 md:px-6">
      <div className="mx-auto max-w-[1280px] space-y-5">
        <SectionSkeleton lines={4} titleWidth="w-28" />
        <SectionSkeleton lines={7} titleWidth="w-32" />
      </div>
    </div>
  ),
});

export default function OpsOrdersPage() {
  return <OrderOperationsPage />;
}
