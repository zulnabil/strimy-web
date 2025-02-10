import { MovieRaw } from "~/app/common/types/movie";

export type TopRatedMovie = Pick<MovieRaw, "id" | "title" | "overview"> & {
  backdrop: string;
  poster: string;
  genres: string[];
  year: number;
  rating: number;
  language: string;
  type: "movie" | "tv";
};
