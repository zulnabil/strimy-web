"use client";

import Image from "next/image";
import { TopRatedMovie } from "../types/feature";
import "./styles/MovieCard.scss";

interface MovieCardProps {
  movie: TopRatedMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="movie-card">
      <div className="movie-card__image">
        <Image
          src={movie.backdrop}
          alt={movie.title}
          width={300}
          height={169}
        />
      </div>
      <div className="movie-card__content">
        <h3>{movie.title}</h3>
        <div className="movie-card__meta">
          <span>{movie.year}</span>
          <span>{movie.rating}+</span>
          <span>{movie.language}</span>
        </div>
        <div className="movie-card__genres">
          {movie.genres.slice(0, 3).map((genre) => (
            <span key={genre} className="genre">
              {genre}
            </span>
          ))}
        </div>
        <div className="movie-card__actions">
          <button className="play-btn">
            <span>▶</span> Watch Now
          </button>
          <button className="add-btn">+</button>
        </div>
      </div>
    </div>
  );
}
