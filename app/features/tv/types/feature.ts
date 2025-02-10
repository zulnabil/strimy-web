import { MovieRaw } from "~/app/common/types/movie";

export interface TVSeriesDetailResponse extends Omit<MovieRaw, "title"> {
  name: string;
  first_air_date: string;
  tagline: string;
  status: string;
  genres: {
    id: number;
    name: string;
  }[];
  seasons: Array<{
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    episode_count: number;
    air_date: string;
    episodes: Array<{
      id: number;
      name: string;
      overview: string;
      episode_number: number;
      season_number: number;
      air_date: string;
      runtime: number;
      still_path: string | null;
    }>;
  }>;
}

export type TVSeriesDetail = {
  id: number;
  title: string;
  overview: string;
  backdrop: string;
  poster: string;
  genres: string[];
  date: string;
  year: number;
  rating: number;
  language: string;
  status: string;
  tagline: string;
  seasons?: Array<Season>;
};

export type Season = {
  id: number;
  name: string;
  overview: string;
  poster: string;
  seasonNumber: number;
  episodeCount: number;
  airDate: string;
  episodes: Array<Episode>;
};

export type Episode = {
  id: number;
  title: string;
  overview: string;
  episodeNumber: number;
  seasonNumber: number;
  airDate: string;
  runtime: number;
  still: string;
};
