export type MovieRaw = {
  adult: boolean;
  backdrop_path: string | null; // Can be null if no backdrop image exists
  genre_ids: number[]; // Array of genre IDs
  id: number; // Unique ID of the movie
  original_language: string; // Original language (e.g., "en")
  original_title: string; // Original title of the movie
  overview: string; // Summary of the movie
  popularity: number; // Popularity score
  poster_path: string | null; // Can be null if no poster image exists
  release_date: string; // Date in the format YYYY-MM-DD
  title: string; // Title of the movie
  video: boolean; // Indicates if the movie has a video
  vote_average: number; // Average vote score
  vote_count: number; // Total number of votes
};

export type MovieResponse = {
  page: number; // Current page number
  results: MovieRaw[]; // Array of movie objects
  total_pages: number; // Total number of pages
  total_results: number; // Total number of results
};
