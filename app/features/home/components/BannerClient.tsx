"use client";

import { useState } from "react";
import Banner from "./Banner";
import { TopRatedMovie } from "../types/feature";

interface BannerClientProps {
  initialMovies: TopRatedMovie[];
}

export default function BannerClient({ initialMovies }: BannerClientProps) {
  const [selectedMovie, setSelectedMovie] = useState(initialMovies[0]);

  return (
    <Banner
      movie={selectedMovie}
      movies={initialMovies}
      onMovieSelect={setSelectedMovie}
    />
  );
}
