"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import "./styles/Carousel.scss";

interface CarouselProps<T> {
  items: T[];
  selectedItem: T;
  onItemSelect: (item: T) => void;
  getImageProps: (item: T) => {
    src: string;
    alt: string;
  };
  getId: (item: T) => number | string;
}

export default function Carousel<T>({
  items,
  selectedItem,
  onItemSelect,
  getImageProps,
  getId,
}: CarouselProps<T>) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth } = carouselRef.current;
        setShowArrows(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 660;
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(
              carouselRef.current.scrollWidth - carouselRef.current.clientWidth,
              scrollPosition + scrollAmount
            );

      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = carouselRef.current
    ? scrollPosition <
      carouselRef.current.scrollWidth - carouselRef.current.clientWidth
    : false;

  return (
    <div className="carousel-container">
      {showArrows && canScrollLeft && (
        <button className="carousel-arrow left" onClick={() => scroll("left")}>
          ‹
        </button>
      )}

      <div className="carousel" ref={carouselRef}>
        {items.map((item) => {
          const { src, alt } = getImageProps(item);
          const id = getId(item);
          return (
            <div
              key={id}
              className={`carousel-item ${
                id === getId(selectedItem) ? "active" : ""
              }`}
              onClick={() => onItemSelect(item)}
            >
              <Image src={src} alt={alt} width={200} height={112} />
            </div>
          );
        })}
      </div>

      {showArrows && canScrollRight && (
        <button
          className="carousel-arrow right"
          onClick={() => scroll("right")}
        >
          ›
        </button>
      )}
    </div>
  );
}
