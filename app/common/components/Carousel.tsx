"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import "./styles/Carousel.scss";
import { cn } from "~/app/common/lib/utils";
import { TopRatedMovie } from "~/app/features/home/types/feature";
import MovieHoverCard from "~/app/features/home/components/MovieHoverCard";

interface CarouselProps<T> {
  items: T[];
  onItemSelect: (item: T) => void;
  getImageProps: (item: T) => {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  getMeta?: (
    item: T
  ) => Pick<
    TopRatedMovie,
    "title" | "overview" | "year" | "rating" | "language" | "type" | "id"
  >;
  getId: (item: T) => number | string;
  selectedItem?: T;
  showHoverContent?: boolean;
}

export default function Carousel<T>({
  items,
  selectedItem,
  onItemSelect,
  getImageProps,
  getMeta,
  getId,
  showHoverContent = false,
}: CarouselProps<T>) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoverState, setHoverState] = useState<{
    isVisible: boolean;
    item: T | null;
    position: { x: number; y: number };
  }>({
    isVisible: false,
    item: null,
    position: { x: 0, y: 0 },
  });
  const timeoutRef = useRef<NodeJS.Timeout>(null);

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
      const scrollAmount = carouselRef.current.clientWidth;
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

  const handleMouseEnter = (item: T, event: React.MouseEvent) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setHoverState({
      isVisible: true,
      item,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
    });
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoverState((prev) => ({ ...prev, isVisible: false }));
    }, 100);
  };

  return (
    <div className="carousel-container">
      {showArrows && canScrollLeft && (
        <button className="carousel-arrow left" onClick={() => scroll("left")}>
          ‹
        </button>
      )}

      <div className="carousel-wrapper">
        <div className="carousel" ref={carouselRef}>
          {items.map((item) => {
            const { src, alt, width = 200, height = 112 } = getImageProps(item);
            const id = getId(item);
            return (
              <div
                key={id}
                className={cn(
                  "carousel-item",
                  `w-${width}`,
                  `h-${height}`,
                  selectedItem && id === getId(selectedItem) && "active"
                )}
                onClick={() => onItemSelect(item)}
                onMouseEnter={(e) => handleMouseEnter(item, e)}
                onMouseLeave={handleMouseLeave}
              >
                <Image src={src} alt={alt} width={width} height={height} />
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && canScrollRight && (
        <button
          className="carousel-arrow right"
          onClick={() => scroll("right")}
        >
          ›
        </button>
      )}

      {showHoverContent && hoverState.item && getMeta && (
        <MovieHoverCard
          {...getImageProps(hoverState.item)}
          isVisible={hoverState.isVisible}
          position={hoverState.position}
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
          onMouseLeave={handleMouseLeave}
          meta={getMeta(hoverState.item)}
        />
      )}
    </div>
  );
}
