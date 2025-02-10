"use client";

import { useState } from "react";
import Image from "next/image";
import type { TVSeriesDetail } from "../types/feature";
import SeasonSection from "./SeasonSection";
import { formatDate } from "~/app/common/lib/utils";
import "./styles/TVSeriesDetail.scss";
import ActionButton from "~/app/features/home/components/ActionButton";
import { useRouter } from "next/navigation";

interface TVSeriesDetailProps {
  series: TVSeriesDetail;
}

export default function TVSeriesDetail({ series }: TVSeriesDetailProps) {
  const [selectedSeason, setSelectedSeason] = useState(series.seasons?.[0]);
  const router = useRouter();

  return (
    <div className="tv-detail">
      <div className="tv-detail__hero">
        <div className="backdrop">
          <Image src={series.backdrop} alt={series.title} fill priority />
        </div>

        <button className="back-button" onClick={() => router.back()}>
          ← Back
        </button>

        <div className="content">
          <div className="poster">
            <Image
              src={series.poster}
              alt={series.title}
              width={300}
              height={450}
            />
          </div>

          <div className="info">
            <h1>{series.title}</h1>
            {series.tagline && <p className="tagline">{series.tagline}</p>}

            <div className="meta">
              <span>{formatDate(series.date)}</span>
              <span>★ {series.rating.toFixed(1)}</span>
              <span>{series.language}</span>
              <span>{series.status}</span>
            </div>

            <div className="genres">
              {series.genres.map((genre) => (
                <span key={genre} className="genre">
                  {genre}
                </span>
              ))}
            </div>

            <p className="overview">{series.overview}</p>

            <ActionButton id={series.id} type="tv" />
          </div>
        </div>
      </div>

      <div className="tv-detail__content">
        {selectedSeason && (
          <SeasonSection
            seasons={series.seasons}
            selectedSeason={selectedSeason}
            onSelectSeason={setSelectedSeason}
          />
        )}
      </div>
    </div>
  );
}
