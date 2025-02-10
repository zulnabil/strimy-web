import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RecommendationsSection from "../RecommendationsSection";

describe("RecommendationsSection", () => {
  const mockRecommendations = [
    {
      id: 1,
      title: "Recommended Movie",
      poster: "/poster.jpg",
      year: 2024,
    },
  ];

  it("renders recommendations correctly", () => {
    render(<RecommendationsSection recommendations={mockRecommendations} />);

    expect(screen.getByText("More Like This")).toBeInTheDocument();
    expect(screen.getByText("Recommended Movie")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders nothing when there are no recommendations", () => {
    render(<RecommendationsSection recommendations={[]} />);
    expect(screen.queryByText("More Like This")).not.toBeInTheDocument();
  });

  it("links to correct movie detail page", () => {
    render(<RecommendationsSection recommendations={mockRecommendations} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1");
  });
});
