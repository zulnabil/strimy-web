import { MovieRaw } from "~/app/common/types/movie";

export interface MovieDetailResponse extends MovieRaw {
  runtime: number;
  status: string;
  tagline: string;
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
  };
  recommendations: {
    results: MovieRaw[];
  };
  genres: {
    id: number;
    name: string;
  }[];
}

export type MovieDetail = {
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
  runtime: number;
  status: string;
  tagline: string;
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile: string;
  }>;
  recommendations: Array<{
    id: number;
    title: string;
    poster: string;
    year: number;
  }>;
};
