import BannerClient from "~/app/features/home/components/BannerClient";
import { getTopRatedMovies } from "~/app/features/home/services/movie";
import "./page.scss";

export default async function Home() {
  const movies = await getTopRatedMovies();

  return (
    <div>
      <main className="main">
        <BannerClient initialMovies={movies} />
      </main>
      <footer></footer>
    </div>
  );
}
