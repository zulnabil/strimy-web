import { searchMoviesAndSeries } from "~/app/features/explore/services/search";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return Response.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const results = await searchMoviesAndSeries(query);
    return Response.json(results);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
