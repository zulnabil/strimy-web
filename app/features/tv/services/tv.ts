import { apiClient } from "~/app/common/lib/api-client";
import { pipe } from "~/app/common/lib/utils";
import { config } from "~/app/common/constants/config";
import { TVSeriesDetailResponse, TVSeriesDetail } from "../types/feature";

const { IMAGE_BASE_URL } = config;

const transformTVSeriesDetail = (
  data: TVSeriesDetailResponse
): TVSeriesDetail => ({
  id: data.id,
  title: data.name,
  overview: data.overview,
  backdrop: data.backdrop_path
    ? `${IMAGE_BASE_URL}/original${data.backdrop_path}`
    : "/assets/images/fallback.jpg",
  poster: data.poster_path
    ? `${IMAGE_BASE_URL}/original${data.poster_path}`
    : "/assets/images/fallback.jpg",
  genres: data.genres.map((genre) => genre.name),
  date: data.first_air_date,
  year: new Date(data.first_air_date).getFullYear(),
  rating: data.vote_average,
  language: data.original_language.toUpperCase(),
  status: data.status,
  tagline: data.tagline,
  seasons: data.seasons.map((season) => ({
    id: season.id,
    name: season.name,
    overview: season.overview,
    poster: season.poster_path
      ? `${IMAGE_BASE_URL}/w300${season.poster_path}`
      : "/assets/images/fallback.jpg",
    seasonNumber: season.season_number,
    episodeCount: season.episodes?.length || 0,
    airDate: season.air_date,
    episodes:
      season.episodes?.map((episode) => ({
        id: episode.id,
        title: episode.name,
        overview: episode.overview,
        episodeNumber: episode.episode_number,
        seasonNumber: episode.season_number,
        airDate: episode.air_date,
        runtime: episode.runtime,
        still: episode.still_path
          ? `${IMAGE_BASE_URL}/w300${episode.still_path}`
          : "/assets/images/fallback.jpg",
      })) || [],
  })),
});

const getEpisodes = async (id: number, seasonNumber: number) =>
  await apiClient(`/tv/${id}/season/${seasonNumber}`);

const getEpisodesBySeasons = async (response: TVSeriesDetailResponse) => {
  const batch = response.seasons.map((season) =>
    getEpisodes(response.id, season.season_number)
  );

  const seasons = await Promise.all(batch);

  return {
    ...response,
    seasons,
  };
};

export const getTVSeriesDetail = pipe(
  async (id: string) => await apiClient(`/tv/${id}`),
  getEpisodesBySeasons,
  transformTVSeriesDetail
);
