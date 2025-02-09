"use client";

import Image from "next/image";
import "./styles/PopularSearches.scss";
import { useSearch } from "../hooks/useSearch";
import { SearchMovieAndSeries } from "../types/feature";

type SearchResultProps = {
  query: string;
};

function ResultSection({
  title,
  items,
}: {
  title: string;
  items: SearchMovieAndSeries[];
}) {
  if (!items.length) return null;

  return (
    <div className="popular-searches">
      <h2>{title}</h2>
      <div className="search-grid">
        {items.map((item) => (
          <div key={item.id} className="search-item">
            <div className="image-wrapper">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 164px, 218px"
              />
              <div className="meta">
                <span className="title">{item.title}</span>
                <span className="overview">{item.overview}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SearchResult({ query }: SearchResultProps) {
  const { results, loading, error } = useSearch(query);

  if (loading) {
    return (
      <div className="popular-searches">
        <h2>Searching...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="popular-searches">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="popular-searches">
        <h2>No results found for "{query}"</h2>
      </div>
    );
  }

  const movies = results.filter((item) => item.type === "movie");
  const series = results.filter((item) => item.type === "tv");

  return (
    <>
      <ResultSection title={`Movies for "${query}"`} items={movies} />
      <ResultSection title={`TV Series for "${query}"`} items={series} />
    </>
  );
}
