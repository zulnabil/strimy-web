import { getMovieDetail } from "~/app/features/movie/services/movie";
import MovieDetail from "~/app/features/movie/components/MovieDetail";
import { notFound } from "next/navigation";

import "./page.scss";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const { id } = await params;
    const movie = await getMovieDetail(id);
    return (
      <main className="movie-page">
        <MovieDetail movie={movie} />
      </main>
    );
  } catch {
    notFound();
  }
}
