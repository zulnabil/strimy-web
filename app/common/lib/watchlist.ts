type WatchlistItem = {
  id: number;
  type: "movie" | "tv";
};

const WATCHLIST_KEY = "watchlist";

export const getWatchlist = (): WatchlistItem[] => {
  if (typeof window === "undefined") return [];

  const watchlist = localStorage.getItem(WATCHLIST_KEY);
  return watchlist ? JSON.parse(watchlist) : [];
};

export const addToWatchlist = (item: WatchlistItem) => {
  const watchlist = getWatchlist();
  const updatedWatchlist = [...watchlist, item];
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
};

export const removeFromWatchlist = (item: WatchlistItem) => {
  const watchlist = getWatchlist();
  const updatedWatchlist = watchlist.filter(
    (i) => !(i.id === item.id && i.type === item.type)
  );
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
};

export const isInWatchlist = (item: WatchlistItem): boolean => {
  const watchlist = getWatchlist();
  return watchlist.some((i) => i.id === item.id && i.type === item.type);
};

export const toggleWatchlist = (item: WatchlistItem) => {
  if (isInWatchlist(item)) {
    removeFromWatchlist(item);
    return false;
  } else {
    addToWatchlist(item);
    return true;
  }
};
