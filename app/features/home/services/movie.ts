import { apiClient } from "~/app/common/lib/api-client";
import { pipe } from "~/app/common/lib/utils";
import { config } from "~/app/common/constants/config";
import { TopRatedMovie } from "../types/feature";
import { MovieResponse } from "~/app/common/types/movie";
import {
  getGenreNames,
  getSeriesGenreNames,
} from "~/app/common/constants/genre";

const { IMAGE_BASE_URL } = config;

const transformMovieData = (data: MovieResponse): TopRatedMovie[] =>
  data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    backdrop: `${IMAGE_BASE_URL}/original${movie.backdrop_path}`,
    poster: `${IMAGE_BASE_URL}/original${movie.poster_path}`,
    genres: getGenreNames(movie.genre_ids),
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
    rating: movie.vote_average,
    language: movie.original_language.toUpperCase(),
    type: "movie",
  }));

const transformSeriesData = (data: MovieResponse): TopRatedMovie[] =>
  data.results.map((movie) => ({
    id: movie.id,
    title: movie.name,
    overview: movie.overview,
    backdrop: `${IMAGE_BASE_URL}/original${movie.backdrop_path}`,
    poster: `${IMAGE_BASE_URL}/original${movie.poster_path}`,
    genres: getSeriesGenreNames(movie.genre_ids),
    year: new Date(movie.release_date || movie.first_air_date).getFullYear(),
    rating: movie.vote_average,
    language: movie.original_language.toUpperCase(),
    type: "tv",
  }));

export const getTopRatedMovies = pipe(
  () => apiClient("/movie/top_rated"),
  transformMovieData
);

export const getTopRatedSeries = pipe(
  () => apiClient("/tv/top_rated"),
  transformSeriesData
);

export const getPopularMovies = pipe(
  () => apiClient("/movie/popular"),
  transformMovieData
);

export const getPopularSeries = pipe(
  () => apiClient("/tv/popular"),
  transformSeriesData
);
