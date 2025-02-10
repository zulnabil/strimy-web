"use client";

import Link from "next/link";
import { cn } from "~/app/common/lib/utils";
import { useEffect, useState } from "react";
import { getDetailLink } from "~/app/common/lib/utils";
import { isInWatchlist, toggleWatchlist } from "~/app/common/lib/watchlist";

import "./styles/ActionButton.scss";

type ActionButtonProps = {
  id: number;
  type: "movie" | "tv";
};

export default function ActionButton({ id, type }: ActionButtonProps) {
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    setIsInList(isInWatchlist({ id, type }));
  }, [id, type]);

  const handleWatchlistClick = () => {
    const added = toggleWatchlist({ id, type });
    setIsInList(added);
  };

  return (
    <div className="actions">
      <button className="play-btn">
        <Link href={getDetailLink(type, id)}>
          <span>▶</span> Watch Now
        </Link>
      </button>

      <button
        className={cn("add-btn", isInList && "in-list")}
        onClick={handleWatchlistClick}
        title={isInList ? "Remove from Watchlist" : "Add to Watchlist"}
      >
        {isInList ? "✓" : "+"}
      </button>
    </div>
  );
}
