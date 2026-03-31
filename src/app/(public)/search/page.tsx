import SearchResultsPage from "@/domains/search/SearchResultsPage";
import { getSearchResultsData } from "@/lib/api/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const data = await getSearchResultsData(query);

  return <SearchResultsPage query={query} data={data} />;
}
