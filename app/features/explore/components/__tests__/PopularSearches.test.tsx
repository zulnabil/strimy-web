import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PopularSearches from "../PopularSearches";

describe("PopularSearches", () => {
  const mockItems = [
    {
      id: 1,
      title: "Popular Movie",
      overview: "Test overview",
      poster: "/test.jpg",
      backdrop: "/backdrop.jpg",
      genres: ["Action"],
      year: 2024,
      rating: 8.5,
      language: "EN",
      type: "movie" as const,
    },
  ];

  it("renders section title", () => {
    render(<PopularSearches items={mockItems} />);

    expect(screen.getByText("Popular Searches")).toBeInTheDocument();
  });

  it("renders popular items", () => {
    render(<PopularSearches items={mockItems} />);

    expect(screen.getByText("Popular Movie")).toBeInTheDocument();
    expect(screen.getByText("Test overview")).toBeInTheDocument();
    expect(screen.getByAltText("Popular Movie")).toBeInTheDocument();
  });

  it("renders empty state when no items", () => {
    render(<PopularSearches items={[]} />);

    expect(screen.getByText("Popular Searches")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("links to correct detail page", () => {
    render(<PopularSearches items={mockItems} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1");
  });
});
