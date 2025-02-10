"use client";

import Image from "next/image";
import { Season, TVSeriesDetail } from "../types/feature";
import { formatDate } from "~/app/common/lib/utils";
import "./styles/SeasonSection.scss";

type SeasonSectionProps = {
  seasons: TVSeriesDetail["seasons"];
  selectedSeason: Season;
  onSelectSeason: (season: Season) => void;
};

export default function SeasonSection({
  seasons,
  selectedSeason,
  onSelectSeason,
}: SeasonSectionProps) {
  return (
    <section className="season-section">
      <div className="season-tabs">
        {seasons?.map((season) => (
          <button
            key={season.id}
            className={`season-tab ${
              selectedSeason.id === season.id ? "active" : ""
            }`}
            onClick={() => onSelectSeason(season)}
          >
            Season {season.seasonNumber}
          </button>
        ))}
      </div>

      <div className="season-content">
        <div className="season-info">
          <div className="poster">
            <Image
              src={selectedSeason.poster}
              alt={selectedSeason.name}
              width={200}
              height={300}
            />
          </div>
          <div className="details">
            <h3>{selectedSeason.name}</h3>
            <div className="meta">
              <span>{formatDate(selectedSeason.airDate)}</span>
              <span>{selectedSeason.episodeCount} Episodes</span>
            </div>
            {selectedSeason.overview && (
              <p className="overview">{selectedSeason.overview}</p>
            )}
          </div>
        </div>

        <div className="episodes-list">
          {selectedSeason?.episodes?.map((episode) => (
            <div key={episode.id} className="episode-card">
              <div className="image-wrapper">
                <Image
                  src={episode.still}
                  alt={episode.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <div className="info">
                <div className="header">
                  <h4>
                    S{episode.seasonNumber} • E{episode.episodeNumber} •{" "}
                    {episode.title}
                  </h4>
                  <div className="meta">
                    <span>{formatDate(episode.airDate)}</span>

                    <span>{episode.runtime} min</span>
                  </div>
                </div>
                <p className="overview">{episode.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
