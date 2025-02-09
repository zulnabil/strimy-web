"use client";

import Image from "next/image";
import { debounce } from "~/app/common/lib/utils";
import "./styles/SearchBar.scss";

type SearchBarProps = {
  onSearch: (search: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const debouncedSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onSearch(event.target.value),
    300
  );

  return (
    <div className="search-bar">
      <span className="search-icon">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
      </span>
      <input
        type="text"
        placeholder="Movies, shows and more"
        className="search-input"
        onChange={debouncedSearch}
      />
    </div>
  );
}
