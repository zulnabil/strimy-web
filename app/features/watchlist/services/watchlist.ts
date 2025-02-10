import { getWatchlist } from "~/app/common/lib/watchlist";

export const getWatchlistItems = async () => {
  const watchlist = getWatchlist();

  const response = await fetch("/api/watchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(watchlist),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch watchlist items");
  }

  return response.json();
};
