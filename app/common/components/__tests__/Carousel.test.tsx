import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "../Carousel";

const mockItems = [
  { id: 1, title: "Item 1", image: "/image1.jpg" },
  { id: 2, title: "Item 2", image: "/image2.jpg" },
];

describe("Carousel", () => {
  it("renders all items", () => {
    render(
      <Carousel
        items={mockItems}
        selectedItem={mockItems[0]}
        onItemSelect={jest.fn()}
        getImageProps={(item) => ({
          src: item.image,
          alt: item.title,
          width: 200,
          height: 112,
        })}
        getId={(item) => item.id}
      />
    );

    expect(screen.getByAltText("Item 1")).toBeInTheDocument();
    expect(screen.getByAltText("Item 2")).toBeInTheDocument();
  });

  it("calls onItemSelect when item is clicked", () => {
    const mockOnSelect = jest.fn();
    render(
      <Carousel
        items={mockItems}
        selectedItem={mockItems[0]}
        onItemSelect={mockOnSelect}
        getImageProps={(item) => ({
          src: item.image,
          alt: item.title,
          width: 200,
          height: 112,
        })}
        getId={(item) => item.id}
      />
    );

    const secondItem = screen.getByAltText("Item 2");
    fireEvent.click(secondItem);

    expect(mockOnSelect).toHaveBeenCalledWith(mockItems[1]);
  });
});
