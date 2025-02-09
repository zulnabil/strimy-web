import { parallel, randomize } from "~/app/common/lib/utils";
import "./page.scss";
import ExploreContent from "~/app/features/explore/components/ExploreContent";
import {
  getPopularMovies,
  getPopularSeries,
} from "~/app/features/home/services/movie";

export default async function ExplorePage() {
  const { popularMovies, popularSeries } = await parallel({
    popularMovies: getPopularMovies(),
    popularSeries: getPopularSeries(),
  });

  const mixPopularMoviesAndSeries = randomize([
    ...popularMovies,
    ...popularSeries,
  ]);
  return (
    <main className="explore">
      <ExploreContent popularMoviesAndSeries={mixPopularMoviesAndSeries} />
    </main>
  );
}
