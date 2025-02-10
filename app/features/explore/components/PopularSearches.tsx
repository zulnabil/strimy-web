"use client";

import Image from "next/image";
import Link from "next/link";
import "./styles/PopularSearches.scss";
import { TopRatedMovie } from "~/app/features/home/types/feature";
import { getDetailLink } from "~/app/common/lib/utils";

type PopularSearchesProps = {
  popularMoviesAndSeries: TopRatedMovie[];
};

export default function PopularSearches({
  popularMoviesAndSeries,
}: PopularSearchesProps) {
  return (
    <div className="popular-searches">
      <h2>Popular Searches</h2>
      <div className="search-grid">
        {popularMoviesAndSeries.map((item) => (
          <Link
            key={item.id}
            href={getDetailLink(item.type, item.id)}
            className="search-item"
          >
            <div className="image-wrapper">
              <Image
                src={item.poster}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 164px, 218px"
                priority
              />
              <div className="meta">
                <span className="title">{item.title}</span>
                <span className="overview">{item.overview}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
