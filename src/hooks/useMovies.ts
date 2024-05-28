import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface Movies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const fetchMovies = async (page: number): Promise<Movies> => {
  const url = `https://api.themoviedb.org/3/movie/popular?page=${page}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGVjODQxZjI4ZThiMDllNTllNTZjYjk2ODE1ODFlMyIsInN1YiI6IjY2NTU2MjA0NjYxYTlkNmU5ZWU0Yjc5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oGlRAD2Q9AwNWpLy6fNrJcfNnaxALwmlJHHnWBhIcpE",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const useMovies = (): UseInfiniteQueryResult<
  InfiniteData<Movies, unknown>
> => {
  return useInfiniteQuery<Movies>({
    queryKey: ["movies"],
    queryFn: ({ pageParam = 1 }) => fetchMovies(pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 1,
  });
};
