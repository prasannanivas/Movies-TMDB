import React from "react";
import MovieComponent from "./MovieComponent";
import { Movie } from "../hooks/useMovies";

interface MovieListProps {
  movies: Movie[] | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  lastMovieElementRef: React.RefObject<HTMLDivElement>;
  onMovieClick: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  lastMovieElementRef,
  onMovieClick,
}) => {
  return (
    <main className="p-4 md:p-8 lg:p-12 flex justify-around flex-wrap mt-8">
      {movies?.map((movie, movieIndex) => (
        <div
          key={movie.id}
          onClick={() => onMovieClick(movie)}
          className="cursor-pointer mb-16 mr-4"
        >
          <MovieComponent key={movie.id} movie={movie} />
        </div>
      ))}
      {isFetchingNextPage && <div className="text-center">Loading more...</div>}
      {hasNextPage && !isFetchingNextPage && (
        <button onClick={fetchNextPage} className="text-center">
          Load More
        </button>
      )}
    </main>
  );
};

export default MovieList;
