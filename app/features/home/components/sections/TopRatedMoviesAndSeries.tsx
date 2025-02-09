"use client";

import { TopRatedMovie } from "../../types/feature";
import Carousel from "~/app/common/components/Carousel";
import "../styles/TopRatedSection.scss";

interface TopRatedMoviesAndSeriesProps {
  movies: TopRatedMovie[];
}

export default function TopRatedMoviesAndSeries({
  movies,
}: TopRatedMoviesAndSeriesProps) {
  return (
    <section className="top-rated-section">
      <h2>Top Rated Movies & TV Series</h2>
      <Carousel
        items={movies}
        selectedItem={movies[0]}
        onItemSelect={() => {}}
        getImageProps={(movie) => ({
          src: movie.poster,
          alt: movie.title,
          width: 164,
          height: 218,
        })}
        getId={(movie) => movie.id}
      />
    </section>
  );
}
