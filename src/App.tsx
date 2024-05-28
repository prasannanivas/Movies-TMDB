// src/App.tsx
import React, { useRef, useCallback, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { Movie, useMovies } from "./hooks/useMovies";
import { useSearchMovies } from "./hooks/useSearchMovies";
import MovieComponent from "./components/MovieComponent";
import Modal from "./components/Modal";

const App: React.FC = () => {
  const {
    data: popularMovies,
    error,
    status,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useMovies();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };
  window.addEventListener("scroll", handleScroll);

  const {
    data: searchedMovies,
    error: searchError,
    isFetching: isSearching,
  } = useSearchMovies(debouncedQuery);

  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (status !== "success" || isFetchingNextPage || !hasNextPage || !node)
        return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      observer.current.observe(node);
    },
    [status, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  // Debounce the search query
  useEffect(() => {
    console.log(window.pageYOffset);
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  if (status === "error" || searchError)
    return <div>Error: {error?.message || searchError?.message}</div>;

  const moviesToDisplay = debouncedQuery
    ? searchedMovies?.results
    : popularMovies?.pages.flatMap((page) => page.results);

  return (
    <div className="App w-full min-h-screen bg-black text-white">
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
              onClick={() => {
                setSearchVisible(!searchVisible);
                setTimeout(() => {
                  const input = document.getElementById("search-input");
                  input && input.focus();
                }, 0);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              className="cursor-pointer"
              onClick={() => {
                setSearchQuery("");
                setDebouncedQuery("");
                setSearchVisible(!searchVisible);
              }}
            />
          )}
          {searchVisible && (
            <input
              type="text"
              id="search-input"
              className="absolute right-10 top-0 p-1 bg-gray-700 text-white rounded w-32 sm:w-48 md:w-64 lg:w-80"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        </div>
      </header>
      <main className="p-4 md:p-8 lg:p-12 flex justify-around flex-wrap mt-8">
        {moviesToDisplay?.map((movie, movieIndex) => (
          <div
            key={movie.id}
            ref={
              !debouncedQuery && movieIndex === moviesToDisplay.length - 1
                ? lastMovieElementRef
                : null
            }
            onClick={() => openModal(movie)}
            className="cursor-pointer mb-16 mr-4"
          >
            <MovieComponent key={movie.id} movie={movie} />
          </div>
        ))}
        {selectedMovie && <Modal movie={selectedMovie} onClose={closeModal} />}
      </main>
      {showBackToTop && (
        <div
          className="fixed bottom-4 right-4 bg-black p-2 rounded-full cursor-pointer bg-gray-600"
          onClick={handleBackToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} size="2x" className="text-white" />
        </div>
      )}
      {isFetchingNextPage && <div className="text-center">Loading more...</div>}
      {isSearching && <div className="text-center">Searching...</div>}
    </div>
  );
};

export default App;
