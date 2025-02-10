"use client";

import Image from "next/image";
import Link from "next/link";
import { getDetailLink } from "../lib/utils";
import "./styles/MediaCard.scss";

interface MediaCardProps {
  id: number;
  type: "movie" | "tv";
  title: string;
  poster: string;
  overview?: string;
}

export default function MediaCard({
  id,
  type,
  title,
  poster,
  overview,
}: MediaCardProps) {
  return (
    <Link key={id} href={getDetailLink(type, id)} className="search-item">
      <div className="image-wrapper">
        <Image
          src={poster}
          alt={title}
          fill
          sizes="(max-width: 768px) 164px, 218px"
          priority
        />
        <div className="meta">
          <span className="title">{title}</span>
          <span className="overview">{overview}</span>
        </div>
      </div>
    </Link>
  );
}
