import dynamic from "next/dynamic";
import { MyShoppingCardSkeleton } from "@/domains/myshopping/MyShoppingStates";

const MyShoppingOrders = dynamic(() => import("@/domains/myshopping/MyShoppingOrders"), {
  loading: () => (
    <div className="space-y-4 bg-[#eef2f5] px-2 py-4">
      <div className="mx-auto max-w-[1280px]">
        <MyShoppingCardSkeleton lines={4} />
      </div>
    </div>
  ),
});

export default function MyShoppingOrdersPage() {
  return <MyShoppingOrders />;
}
