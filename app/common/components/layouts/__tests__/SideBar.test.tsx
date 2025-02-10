import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SideBar from "../SideBar";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("SideBar", () => {
  it("renders navigation links", () => {
    render(<SideBar />);

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /watchlist/i })
    ).toBeInTheDocument();
  });

  it("renders navigation icons", () => {
    render(<SideBar />);

    expect(screen.getByAltText("Home")).toBeInTheDocument();
    expect(screen.getByAltText("Explore")).toBeInTheDocument();
    expect(screen.getByAltText("Watchlist")).toBeInTheDocument();
  });
});
