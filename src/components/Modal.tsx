// src/components/MovieModal.tsx
import React, { useEffect } from "react";
import { Movie } from "../hooks/useMovies";
import StarRating from "./StarRating";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const releaseYear = movie.release_date.substring(0, 4); // Extracting year from release_date

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("modal");
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex justify-center items-center text-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        id="modal"
        className="bg-white p-8 rounded-lg shadow-lg z-10 w-4/5 max-w-md"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="font-bold text-2xl mb-4 text-black">{movie.title}</div>
        <img
          className="w-full h-auto mb-4 rounded-lg object-cover"
          style={{ maxHeight: "200px" }}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="text-gray-700 mb-4">{movie.overview}</div>
        <div className="flex justify-center items-center">
          <div className="mr-4">
            <div className="text-sm text-gray-700">
              Release Year: {releaseYear}
            </div>
            <div className="text-sm text-gray-700">
              Popularity: {movie.popularity}
            </div>
          </div>
          <StarRating
            rating={movie.vote_average}
            voteCount={movie.vote_count}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
