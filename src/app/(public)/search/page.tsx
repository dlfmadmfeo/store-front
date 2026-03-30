import SearchResultsPage from "@/domains/search/SearchResultsPage";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;

  return <SearchResultsPage query={params.q ?? ""} />;
}
