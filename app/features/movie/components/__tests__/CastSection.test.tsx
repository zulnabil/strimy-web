import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CastSection from "../CastSection";

describe("CastSection", () => {
  const mockCast = [
    {
      id: 1,
      name: "Actor Name",
      character: "Character Name",
      profile: "/profile.jpg",
    },
  ];

  it("renders cast information correctly", () => {
    render(<CastSection cast={mockCast} />);

    expect(screen.getByText("Cast")).toBeInTheDocument();
    expect(screen.getByText("Actor Name")).toBeInTheDocument();
    expect(screen.getByText("Character Name")).toBeInTheDocument();
  });

  it("renders cast member image", () => {
    render(<CastSection cast={mockCast} />);

    const image = screen.getByAltText("Actor Name");
    expect(image).toBeInTheDocument();
  });

  it("renders multiple cast members", () => {
    const multipleCast = [
      ...mockCast,
      {
        id: 2,
        name: "Another Actor",
        character: "Another Character",
        profile: "/another-profile.jpg",
      },
    ];

    render(<CastSection cast={multipleCast} />);

    expect(screen.getByText("Another Actor")).toBeInTheDocument();
    expect(screen.getByText("Another Character")).toBeInTheDocument();
  });
});
