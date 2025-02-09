import TopRatedMoviesAndSeries from "~/app/features/home/components/sections/TopRatedMoviesAndSeries";
import {
  getPopularMovies,
  getPopularSeries,
  getTopRatedMovies,
  getTopRatedSeries,
} from "~/app/features/home/services/movie";
import "./page.scss";
import Banner from "./features/home/components/sections/Banner";
import { parallel, randomize } from "./common/lib/utils";
import PopularMovies from "./features/home/components/sections/PopularMovies";
import PopularSeries from "./features/home/components/sections/PopularSeries";

export default async function Home() {
  const { topRatedMovies, topRatedSeries, popularMovies, popularSeries } =
    await parallel({
      topRatedMovies: getTopRatedMovies(),
      topRatedSeries: getTopRatedSeries(),
      popularMovies: getPopularMovies(),
      popularSeries: getPopularSeries(),
    });

  // mix and randomize the topRatedMovies and topRatedSeries
  const mixTopRatedMoviesAndSeries = randomize([
    ...topRatedMovies,
    ...topRatedSeries,
  ]);

  return (
    <main className="main">
      <Banner movies={mixTopRatedMoviesAndSeries} />
      <TopRatedMoviesAndSeries movies={mixTopRatedMoviesAndSeries} />
      <PopularMovies movies={popularMovies} />
      <PopularSeries movies={popularSeries} />
    </main>
  );
}
