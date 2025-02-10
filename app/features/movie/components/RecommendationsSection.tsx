"use client";

import Image from "next/image";
import Link from "next/link";
import { MovieDetail } from "../types/feature";
import "./styles/RecommendationsSection.scss";

type RecommendationsSectionProps = {
  recommendations: MovieDetail["recommendations"];
};

export default function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  if (!recommendations.length) return null;

  return (
    <section className="recommendations-section">
      <h2>More Like This</h2>
      <div className="recommendations-grid">
        {recommendations.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="movie-card"
          >
            <div className="image-wrapper">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 120px, 200px"
              />
            </div>
            <div className="info">
              <span className="title">{movie.title}</span>
              <span className="year">{movie.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
