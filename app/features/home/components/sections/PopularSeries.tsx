"use client";

import { TopRatedMovie } from "../../types/feature";
import Carousel from "~/app/common/components/Carousel";
import "../styles/TopRatedSection.scss";

interface PopularSeriesProps {
  movies: TopRatedMovie[];
}

export default function PopularSeries({ movies }: PopularSeriesProps) {
  return (
    <section className="top-rated-section">
      <h2>Top Rated TV Series of the week</h2>
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
        getMeta={(movie) => ({
          title: movie.title,
          overview: movie.overview,
          year: movie.year,
          rating: movie.rating,
          language: movie.language,
          type: movie.type,
          id: movie.id,
        })}
        getId={(movie) => movie.id}
        showHoverContent={true}
      />
    </section>
  );
}
