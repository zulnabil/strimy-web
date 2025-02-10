"use client";

import Image from "next/image";
import { TopRatedMovie } from "../../types/feature";
import Carousel from "~/app/common/components/Carousel";
import "../styles/Banner.scss";
import { useState } from "react";
import ActionButton from "../ActionButton";

interface BannerProps {
  movies: TopRatedMovie[];
}

export default function Banner({ movies }: BannerProps) {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);

  return (
    <div className="banner">
      <div className="banner__image">
        <Image
          src={selectedMovie.backdrop}
          alt={selectedMovie.title}
          fill
          priority
        />
      </div>

      <div className="banner__content">
        <div className="banner__info">
          <h1>{selectedMovie.title}</h1>
          <div className="banner__meta">
            <span className="rating">★ {selectedMovie.rating.toFixed(1)}</span>
            <span className="language">{selectedMovie.language}</span>
            <span className="year">{selectedMovie.year || ""}</span>
          </div>
          <p className="description">{selectedMovie.overview}</p>
          <div className="banner__genres">
            {selectedMovie.genres.map((genre) => (
              <span key={genre} className="genre">
                {genre}
              </span>
            ))}
          </div>

          <ActionButton id={selectedMovie.id} type={selectedMovie.type} />
        </div>
      </div>

      <div className="banner__carousel">
        <Carousel
          items={movies}
          selectedItem={selectedMovie}
          onItemSelect={setSelectedMovie}
          getImageProps={(movie) => ({
            src: movie.backdrop,
            alt: movie.title,
            width: 200,
            height: 112,
          })}
          getId={(movie) => movie.id}
        />
      </div>
    </div>
  );
}
