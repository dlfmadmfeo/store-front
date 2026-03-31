import MyShopping from "@/domains/myshopping/MyShopping";
import { getMyShoppingHomeData } from "@/lib/api/myshopping";

export default async function MyShoppingPage() {
  const data = await getMyShoppingHomeData();

  return <MyShopping data={data} />;
}
