import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SeasonSection from "../SeasonSection";

describe("SeasonSection", () => {
  const mockSeasons = [
    {
      id: 1,
      name: "Season 1",
      overview: "First season",
      poster: "/test.jpg",
      seasonNumber: 1,
      episodeCount: 10,
      airDate: "2024-01-01",
      episodes: [
        {
          id: 101,
          title: "Episode 1",
          overview: "First episode",
          episodeNumber: 1,
          seasonNumber: 1,
          airDate: "2024-01-01",
          runtime: 45,
          still: "/still.jpg",
        },
      ],
    },
  ];

  const mockProps = {
    seasons: mockSeasons,
    selectedSeason: mockSeasons[0],
    onSelectSeason: jest.fn(),
  };

  it("renders season information correctly", () => {
    render(<SeasonSection {...mockProps} />);

    expect(
      screen.getByRole("heading", { name: "Season 1" })
    ).toBeInTheDocument();
    expect(screen.getByText("First season")).toBeInTheDocument();
    expect(screen.getByText("10 Episodes")).toBeInTheDocument();
  });

  it("renders episode information correctly", () => {
    render(<SeasonSection {...mockProps} />);

    expect(screen.getByText(/Episode 1/)).toBeInTheDocument();
    expect(screen.getByText("First episode")).toBeInTheDocument();
    expect(screen.getByText("45 min")).toBeInTheDocument();
  });

  it("handles season selection", () => {
    render(<SeasonSection {...mockProps} />);

    // get button and text "Season 1"
    const seasonTab = screen.getByRole("button", { name: "Season 1" });
    fireEvent.click(seasonTab);

    expect(mockProps.onSelectSeason).toHaveBeenCalledWith(mockSeasons[0]);
  });
});
