"use client";

import Image from "next/image";
import type { MovieDetail } from "../types/feature";
import CastSection from "./CastSection";
import RecommendationsSection from "./RecommendationsSection";
import "./styles/MovieDetail.scss";
import { formatDate } from "~/app/common/lib/utils";

interface MovieDetailProps {
  movie: MovieDetail;
}

export default function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <div className="movie-detail">
      <div className="movie-detail__hero">
        <div className="backdrop">
          <Image src={movie.backdrop} alt={movie.title} fill priority />
        </div>

        <div className="content">
          <div className="poster">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={300}
              height={450}
            />
          </div>

          <div className="info">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">{movie.tagline}</p>}

            <div className="meta">
              <span>{formatDate(movie.date)}</span>
              <span>{movie.runtime} min</span>
              <span>★ {movie.rating.toFixed(1)}</span>
              <span>{movie.language}</span>
            </div>

            <div className="genres">
              {movie.genres.map((genre) => (
                <span key={genre} className="genre">
                  {genre}
                </span>
              ))}
            </div>

            <p className="overview">{movie.overview}</p>

            <div className="actions">
              <button className="play-btn">
                <span>▶</span> Watch Now
              </button>
              <button className="add-btn" title="Add to Watchlist">
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-detail__content">
        <RecommendationsSection recommendations={movie.recommendations} />
        <CastSection cast={movie.cast} />
      </div>
    </div>
  );
}
