"use client";

import Image from "next/image";
import { MovieDetail } from "../types/feature";
import "./styles/CastSection.scss";

type CastSectionProps = {
  cast: MovieDetail["cast"];
};

export default function CastSection({ cast }: CastSectionProps) {
  return (
    <section className="cast-section">
      <h2>Cast</h2>
      <div className="cast-grid">
        {cast.map((member) => (
          <div key={member.id} className="cast-card">
            <div className="image-wrapper">
              <Image
                src={member.profile}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100px, 185px"
              />
            </div>
            <div className="info">
              <span className="name">{member.name}</span>
              <span className="character">{member.character}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
