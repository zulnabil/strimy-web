import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders search input", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(
      screen.getByPlaceholderText(/Movies, shows and more/i)
    ).toBeInTheDocument();
  });

  it("calls onSearch when input changes", async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/Movies, shows and more/i);
    fireEvent.change(input, { target: { value: "test" } });

    // wait for debounce
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  it("debounces search input", async () => {
    jest.useFakeTimers();
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/Movies, shows and more/i);
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockOnSearch).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });
});
