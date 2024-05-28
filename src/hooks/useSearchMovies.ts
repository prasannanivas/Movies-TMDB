import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Movie } from "./useMovies";

interface SearchedMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const fetchSearchedMovies = async (query: string): Promise<SearchedMovies> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
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

export const useSearchMovies = (
  query: string
): UseQueryResult<SearchedMovies> => {
  return useQuery<SearchedMovies>({
    queryKey: ["searchMovies", query],
    queryFn: () => fetchSearchedMovies(query),
    enabled: !!query,
  });
};
