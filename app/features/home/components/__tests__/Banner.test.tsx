import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Banner from "../sections/Banner";

const mockMovies = [
  {
    id: 1,
    title: "Test Movie 1",
    overview: "Test overview 1",
    poster: "/test1.jpg",
    backdrop: "/backdrop1.jpg",
    rating: 8.5,
    year: 2024,
    language: "EN",
    genres: ["Action"],
    type: "movie" as const,
  },
  {
    id: 2,
    title: "Test Movie 2",
    overview: "Test overview 2",
    poster: "/test2.jpg",
    backdrop: "/backdrop2.jpg",
    rating: 7.5,
    year: 2023,
    language: "ES",
    genres: ["Drama"],
    type: "movie" as const,
  },
];

describe("Banner", () => {
  it("renders the first movie by default", () => {
    render(<Banner movies={mockMovies} />);

    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test overview 1")).toBeInTheDocument();
    expect(screen.getByText("★ 8.5")).toBeInTheDocument();
  });

  it("changes selected movie when carousel item is clicked", () => {
    render(<Banner movies={mockMovies} />);

    const secondMovie = screen.getByAltText("Test Movie 2");
    fireEvent.click(secondMovie);

    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Test overview 2")).toBeInTheDocument();
  });
});
