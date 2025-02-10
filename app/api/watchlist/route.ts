import { NextResponse } from "next/server";
import { getMovieDetail } from "~/app/features/movie/services/movie";
import { getTVSeriesDetail } from "~/app/features/tv/services/tv";

export async function POST(request: Request) {
  try {
    const watchlist = await request.json();

    const items = await Promise.all(
      watchlist.map(async (item: { id: number; type: "movie" | "tv" }) => {
        try {
          if (item.type === "movie") {
            return {
              ...(await getMovieDetail(item.id.toString())),
              type: "movie" as const,
            };
          } else {
            return {
              ...(await getTVSeriesDetail(item.id.toString())),
              type: "tv" as const,
            };
          }
        } catch (error) {
          console.error(`Error fetching ${item.type} ${item.id}:`, error);
          return null;
        }
      })
    );

    return NextResponse.json(items.filter(Boolean));
  } catch (error) {
    console.error("Error processing watchlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch watchlist items" },
      { status: 500 }
    );
  }
}
