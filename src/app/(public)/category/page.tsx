import CategoryLanding from "@/domains/category/CategoryLanding";
import { getCategoryMenuData } from "@/lib/api/navigation";

export default async function CategoryPage() {
  const data = await getCategoryMenuData();

  return <CategoryLanding data={data} />;
}
