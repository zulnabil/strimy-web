import { apiClient } from "~/app/common/lib/api-client";
import { pipe } from "~/app/common/lib/utils";
import { config } from "~/app/common/constants/config";
import { TopRatedMovie } from "~/app/features/home/types/feature";
import {
  getGenreNames,
  getSeriesGenreNames,
} from "~/app/common/constants/genre";
import { SearchResultResponse } from "../types/feature";

const { IMAGE_BASE_URL } = config;

const transformSearchData = (data: SearchResultResponse): TopRatedMovie[] =>
  data.results
    .filter((item) => item.media_type === "movie" || item.media_type === "tv")
    .map((item) => ({
      id: item.id,
      title: item.title || item.name || "",
      overview: item.overview,
      poster: item.poster_path
        ? `${IMAGE_BASE_URL}/original${item.poster_path}`
        : "/assets/images/fallback.jpg",
      backdrop: item.backdrop_path
        ? `${IMAGE_BASE_URL}/original${item.backdrop_path}`
        : "/assets/images/fallback.jpg",

      genres: item.genre_ids.map((id) =>
        item.media_type === "movie"
          ? getGenreNames([id])[0]
          : getSeriesGenreNames([id])[0]
      ),
      rating: item.vote_average,
      year: new Date(
        item.release_date || item.first_air_date || ""
      ).getFullYear(),
      language: item.original_language.toUpperCase(),
      type: item.media_type,
    }));

export const searchMoviesAndSeries = pipe(
  (query: string) =>
    apiClient(`/search/multi?query=${query}&include_adult=false`),
  transformSearchData
);
