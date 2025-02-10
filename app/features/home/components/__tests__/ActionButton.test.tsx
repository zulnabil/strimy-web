import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ActionButton from "../ActionButton";
import { getWatchlist, toggleWatchlist } from "~/app/common/lib/watchlist";

jest.mock("~/app/common/lib/watchlist");

describe("ActionButton", () => {
  const mockProps = {
    id: 1,
    type: "movie" as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getWatchlist as jest.Mock).mockReturnValue([]);
  });

  it("renders add button by default", () => {
    render(<ActionButton {...mockProps} />);

    const button = screen.getByRole("button", { name: /\+/i });
    expect(button).not.toHaveClass("in-list");
  });

  it("renders remove button when item is in watchlist", () => {
    (getWatchlist as jest.Mock).mockReturnValue([{ id: 1, type: "movie" }]);
    render(<ActionButton {...mockProps} />);

    const button = screen.getByRole("button", { name: /\+/i });
    expect(button).toHaveClass("add-btn");
  });

  it("toggles watchlist when clicked", () => {
    render(<ActionButton {...mockProps} />);

    const button = screen.getByRole("button", { name: /\+/i });
    fireEvent.click(button);

    expect(toggleWatchlist).toHaveBeenCalledWith({
      id: 1,
      type: "movie",
    });
  });

  it("updates button state after toggle", () => {
    (toggleWatchlist as jest.Mock).mockReturnValue(true);
    render(<ActionButton {...mockProps} />);

    const button = screen.getByRole("button", { name: /\+/i });
    fireEvent.click(button);

    expect(button).toHaveClass("in-list");
  });
});
