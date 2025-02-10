"use client";

import { useState } from "react";
import { MovieDetail } from "~/app/features/movie/types/feature";
import { TVSeriesDetail } from "~/app/features/tv/types/feature";
import MediaCard from "~/app/common/components/MediaCard";
import { toggleWatchlist } from "~/app/common/lib/watchlist";
import "./styles/WatchlistGrid.scss";
import SearchBar from "~/app/features/explore/components/SearchBar";

type WatchlistItem =
  | (MovieDetail & { type: "movie" })
  | (TVSeriesDetail & { type: "tv" });

interface WatchlistGridProps {
  items: WatchlistItem[];
  onItemsChange: () => void;
}

export default function WatchlistGrid({
  items,
  onItemsChange,
}: WatchlistGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  if (items.length === 0) {
    return (
      <div className="empty-watchlist">
        <h2>Your watchlist is empty</h2>
        <p>Add movies and TV shows to keep track of what you want to watch</p>
      </div>
    );
  }

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveSelected = () => {
    selectedItems.forEach((id) => {
      const item = items.find((i) => i.id === id);
      if (item) {
        toggleWatchlist(item);
      }
    });
    setSelectedItems(new Set());
    setIsSelectionMode(false);
    onItemsChange();
  };

  const toggleItemSelection = (id: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  return (
    <div>
      <h2 className="mb-6">Your Watchlist</h2>
      <div className="watchlist-actions">
        <SearchBar onSearch={setSearchQuery} />
        <button
          className="select-btn"
          onClick={() => setIsSelectionMode(!isSelectionMode)}
        >
          {isSelectionMode ? "Cancel" : "Select"}
        </button>
        {isSelectionMode && selectedItems.size > 0 && (
          <button className="remove-btn" onClick={handleRemoveSelected}>
            Remove Selected ({selectedItems.size})
          </button>
        )}
      </div>

      <div className="watchlist-grid">
        {filteredItems.map((item) => (
          <div key={`${item.type}-${item.id}`} className="card-wrapper">
            <MediaCard
              id={item.id}
              type={item.type}
              title={item.title}
              poster={item.poster}
              overview={item.overview}
            />
            {isSelectionMode && (
              <input
                type="checkbox"
                checked={selectedItems.has(item.id)}
                onChange={() => toggleItemSelection(item.id)}
                className="selection-checkbox"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
