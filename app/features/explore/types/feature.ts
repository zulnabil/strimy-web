import { MovieRaw, MovieResponse } from "~/app/common/types/movie";
import { TopRatedMovie } from "~/app/features/home/types/feature";

export type SearchResultMovieAndSeries = MovieRaw & {
  media_type: "movie" | "tv";
  name?: string;
  first_air_date?: string;
};

export type SearchResultResponse = Omit<MovieResponse, "results"> & {
  results: SearchResultMovieAndSeries[];
};

export type SearchMovieAndSeries = TopRatedMovie & {
  type: "movie" | "tv";
};
