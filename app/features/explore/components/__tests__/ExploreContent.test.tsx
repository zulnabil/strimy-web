import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ExploreContent from "../ExploreContent";

describe("ExploreContent", () => {
  const mockPopularItems = [
    {
      id: 1,
      title: "Test Movie",
      overview: "Test overview",
      poster: "/test.jpg",
      backdrop: "/test-backdrop.jpg",
      genres: ["Action"],
      year: 2024,
      rating: 8.5,
      language: "EN",
      type: "movie" as const,
    },
  ];

  it("renders popular searches by default", () => {
    render(<ExploreContent popularMoviesAndSeries={mockPopularItems} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("switches to search results when query is entered", async () => {
    render(<ExploreContent popularMoviesAndSeries={mockPopularItems} />);

    const searchInput = screen.getByPlaceholderText("Movies, shows and more");
    fireEvent.change(searchInput, { target: { value: "test query" } });

    // add delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(screen.queryByText("Test Movie")).not.toBeInTheDocument();
  });
});
