import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieHoverCard from "../MovieHoverCard";

describe("MovieHoverCard", () => {
  const mockProps = {
    src: "/test.jpg",
    alt: "Test Movie",
    width: 200,
    height: 300,
    isVisible: true,
    position: { x: 100, y: 100 },
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    meta: {
      id: 1,
      title: "Test Movie",
      overview: "Test overview",
      year: 2024,
      rating: 8.5,
      language: "EN",
      type: "movie" as const,
    },
  };

  beforeAll(() => {
    // Mock createPortal
    const portal = document.createElement("div");
    portal.setAttribute("id", "portal");
    document.body.appendChild(portal);
  });

  it("renders movie information correctly", () => {
    render(<MovieHoverCard {...mockProps} />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test overview")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("★ 8.5")).toBeInTheDocument();
  });

  it("handles mouse events", () => {
    render(<MovieHoverCard {...mockProps} />);

    const card = screen.getByText("Test Movie").closest(".movie-hover-card");
    fireEvent.mouseEnter(card!);
    expect(mockProps.onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(card!);
    expect(mockProps.onMouseLeave).toHaveBeenCalled();
  });

  it("doesn't render when not visible", () => {
    render(<MovieHoverCard {...mockProps} isVisible={false} />);
    expect(screen.queryByText("Test Movie")).not.toBeInTheDocument();
  });
});
