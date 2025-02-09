"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import PopularSearches from "./PopularSearches";
import SearchResult from "./SearchResult";
import { TopRatedMovie } from "~/app/features/home/types/feature";

type ExploreContentProps = {
  popularMoviesAndSeries: TopRatedMovie[];
};

export default function ExploreContent({
  popularMoviesAndSeries,
}: ExploreContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      {searchQuery ? (
        <SearchResult query={searchQuery} />
      ) : (
        <PopularSearches popularMoviesAndSeries={popularMoviesAndSeries} />
      )}
    </div>
  );
}
