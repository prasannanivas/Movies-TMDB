import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center md:px-20 bg-gray-900 fixed top-0 w-full z-50">
      <h1 className="text-2xl md:text-3xl" style={{ fontFamily: "Jacquard" }}>
        Movies List
      </h1>
      <div className="relative mt-1">
        {!searchVisible ? (
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            className="cursor-pointer"
            onClick={() => setSearchVisible(!searchVisible)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            className="cursor-pointer"
            onClick={() => {
              setSearchQuery("");
              setSearchVisible(!searchVisible);
            }}
          />
        )}
        {searchVisible && (
          <input
            type="text"
            className="absolute right-10 top-0 p-1 bg-gray-700 text-white rounded w-32 sm:w-48 md:w-64 lg:w-80"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch(searchQuery);
              }
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
