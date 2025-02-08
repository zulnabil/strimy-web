"use client";

import Image from "next/image";
import { TopRatedMovie } from "../types/feature";
import Carousel from "~/app/common/components/Carousel";
import "./styles/Banner.scss";

interface BannerProps {
  movie: TopRatedMovie;
  movies: TopRatedMovie[];
  onMovieSelect: (movie: TopRatedMovie) => void;
}

export default function Banner({ movie, movies, onMovieSelect }: BannerProps) {
  return (
    <div className="banner">
      <div className="banner__image">
        <Image src={movie.backdrop} alt={movie.title} fill priority />
      </div>

      <div className="banner__content pl-12">
        <div className="banner__info">
          <h1>{movie.title}</h1>
          <div className="banner__meta">
            <span className="year">{movie.year}</span>
            <span className="rating">{movie.rating}+</span>
            <span className="season">1 Season</span>
            <span className="language">{movie.language}</span>
          </div>
          <p className="description">{movie.overview}</p>
          <div className="banner__genres">
            {movie.genres.map((genre) => (
              <span key={genre} className="genre">
                {genre}
              </span>
            ))}
          </div>

          <div className="banner__actions">
            <button className="play-btn">
              <span>▶</span> Watch Now
            </button>
            <button className="add-btn">+</button>
          </div>
        </div>
      </div>

      <div className="banner__carousel">
        <Carousel
          items={movies}
          selectedItem={movie}
          onItemSelect={onMovieSelect}
          getImageProps={(movie) => ({
            src: movie.backdrop,
            alt: movie.title,
          })}
          getId={(movie) => movie.id}
        />
      </div>
    </div>
  );
}
