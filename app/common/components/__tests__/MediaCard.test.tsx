import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MediaCard from "../MediaCard";

describe("MediaCard", () => {
  const mockProps = {
    id: 1,
    type: "movie" as const,
    title: "Test Movie",
    poster: "/test-poster.jpg",
    overview: "Test overview",
  };

  it("renders movie information correctly", () => {
    render(<MediaCard {...mockProps} />);

    expect(screen.getByAltText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test overview")).toBeInTheDocument();
  });

  it("links to movie detail page", () => {
    render(<MediaCard {...mockProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1");
  });

  it("links to TV series detail page when type is tv", () => {
    render(<MediaCard {...mockProps} type="tv" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/tv/1");
  });

  it("handles missing overview", () => {
    const propsWithoutOverview = { ...mockProps, overview: undefined };
    render(<MediaCard {...propsWithoutOverview} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.queryByText("Test overview")).not.toBeInTheDocument();
  });
});
