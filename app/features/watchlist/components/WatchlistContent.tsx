"use client";

import { useEffect, useState } from "react";
import { getWatchlistItems } from "../services/watchlist";
import WatchlistGrid from "./WatchlistGrid";

export default function WatchlistContent() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const data = await getWatchlistItems();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (isLoading) {
    return <div className="watchlist-grid">Loading...</div>;
  }

  return <WatchlistGrid items={items} onItemsChange={fetchItems} />;
}
