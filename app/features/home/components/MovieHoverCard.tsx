"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn, getDetailLink } from "~/app/common/lib/utils";
import { TopRatedMovie } from "../types/feature";
import "./styles/MovieHoverCard.scss";
import Link from "next/link";

interface MovieHoverCardProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  isVisible: boolean;
  position: { x: number; y: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  meta: Pick<
    TopRatedMovie,
    "title" | "overview" | "year" | "rating" | "language" | "type" | "id"
  >;
}

export default function MovieHoverCard({
  src,
  alt,
  width,
  height,
  isVisible,
  meta,
  position,
  onMouseEnter,
  onMouseLeave,
}: MovieHoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !isVisible) return;
    cardRef.current.style.left = `${position.x}px`;
    cardRef.current.style.top = `${position.y}px`;
  }, [isVisible, position]);

  if (!isVisible) return null;

  return createPortal(
    <div
      ref={cardRef}
      className={cn("movie-hover-card", isVisible && "visible")}
      style={{
        width: width * 1.5,
        height: height * 1.5,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onWheel={onMouseLeave}
    >
      <Image src={src} alt={alt} width={width * 1.5} height={height * 1.5} />
      <div className="content">
        <div className="actions">
          <button className="play">
            <Link href={getDetailLink(meta?.type, meta?.id)}>
              <span>▶</span> Watch Now
            </Link>
          </button>
          <button className="add" title="Watchlist">
            +
          </button>
        </div>
        <h3>{meta?.title}</h3>
        <div className="meta">
          <span className="rating">★ {meta?.rating.toFixed(1)}</span>
          <span>{meta?.language}</span>
          <span>{meta?.year || ""}</span>
        </div>
        <div className="description">{meta?.overview}</div>
      </div>
    </div>,
    document.body
  );
}
