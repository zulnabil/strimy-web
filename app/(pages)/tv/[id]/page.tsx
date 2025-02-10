import { getTVSeriesDetail } from "~/app/features/tv/services/tv";
import TVSeriesDetail from "~/app/features/tv/components/TVSeriesDetail";
import { notFound } from "next/navigation";

import "./page.scss";

export default async function TVSeriesPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  try {
    const series = await getTVSeriesDetail(id);
    return (
      <main className="tv-page">
        <TVSeriesDetail series={series} />
      </main>
    );
  } catch {
    notFound();
  }
}
