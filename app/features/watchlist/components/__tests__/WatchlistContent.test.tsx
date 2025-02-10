import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import WatchlistContent from "../WatchlistContent";
import { getWatchlistItems } from "../../services/watchlist";

jest.mock("../../services/watchlist");

describe("WatchlistContent", () => {
  const mockItems = [
    {
      id: 1,
      title: "Test Movie",
      overview: "Test overview",
      poster: "/test.jpg",
      type: "movie",
    },
  ];

  beforeEach(() => {
    (getWatchlistItems as jest.Mock).mockResolvedValue(mockItems);
  });

  it("shows loading state initially", () => {
    render(<WatchlistContent />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders watchlist items after loading", async () => {
    render(<WatchlistContent />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(screen.getByText("Test Movie")).toBeInTheDocument();
    });
  });

  it("handles error state", async () => {
    (getWatchlistItems as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );

    render(<WatchlistContent />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
