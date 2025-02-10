import { apiClient } from "~/app/common/lib/api-client";
import { pipe } from "~/app/common/lib/utils";
import { config } from "~/app/common/constants/config";
import { MovieDetailResponse } from "../types/feature";
import { MovieDetail } from "../types/feature";

const { IMAGE_BASE_URL } = config;

const transformMovieDetail = (data: MovieDetailResponse): MovieDetail => ({
  id: data.id,
  title: data.title,
  overview: data.overview,
  backdrop: data.backdrop_path
    ? `${IMAGE_BASE_URL}/original${data.backdrop_path}`
    : "/assets/images/fallback.jpg",
  poster: data.poster_path
    ? `${IMAGE_BASE_URL}/original${data.poster_path}`
    : "/assets/images/fallback.jpg",
  genres: data.genres.map((genre) => genre.name),
  date: data.release_date,
  year: new Date(data.release_date).getFullYear(),
  rating: data.vote_average,
  language: data.original_language.toUpperCase(),
  runtime: data.runtime,
  status: data.status,
  tagline: data.tagline,
  cast: data.credits.cast.slice(0, 10).map((member) => ({
    id: member.id,
    name: member.name,
    character: member.character,
    profile: member.profile_path
      ? `${IMAGE_BASE_URL}/w185${member.profile_path}`
      : "/assets/images/fallback-profile.jpg",
  })),
  recommendations: data.recommendations.results.slice(0, 10).map((movie) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
      : "/assets/images/fallback.jpg",
    year: new Date(movie.release_date).getFullYear(),
  })),
});

export const getMovieDetail = pipe(
  (id: string) =>
    apiClient(`/movie/${id}?append_to_response=credits,recommendations`),
  transformMovieDetail
);
