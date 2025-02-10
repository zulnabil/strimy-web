"use client";

import { TopRatedMovie } from "~/app/features/home/types/feature";
import MediaCard from "~/app/common/components/MediaCard";
import "./styles/PopularSearches.scss";

type PopularSearchesProps = {
  items: TopRatedMovie[];
};

export default function PopularSearches({ items }: PopularSearchesProps) {
  return (
    <div className="popular-searches">
      <h2>Popular Searches</h2>
      <div className="search-grid">
        {items?.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            type={item.type}
            title={item.title}
            poster={item.poster}
            overview={item.overview}
          />
        ))}
      </div>
    </div>
  );
}
