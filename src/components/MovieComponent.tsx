import React, { useState } from "react";
import { Movie } from "../hooks/useMovies";
import MovieModal from "./Modal";

interface MovieComponentProps {
  movie: Movie;
}

const MovieComponent: React.FC<MovieComponentProps> = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const overview =
    movie.overview.length > 100
      ? `${movie.overview.substring(0, 100)}...`
      : movie.overview;

  return (
    <>
      <div
        className="w-80 rounded overflow-hidden shadow-xl cursor-pointer m-4 transition duration-300 hover:scale-105 bg-white text-black h-full flex flex-col justify-between pb-2"
        onClick={toggleModal}
      >
        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{movie.title}</div>
          <p className="text-gray-900 text-base">{overview}</p>
        </div>
        <div className="px-6 pt-4 pb-2 text-center">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Release Year: {movie.release_date.substring(0, 4)}
          </span>
        </div>
      </div>
      {showModal && <MovieModal movie={movie} onClose={toggleModal} />}
    </>
  );
};

export default MovieComponent;
