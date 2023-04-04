import { Cast } from "./cast.model";

export interface Movie {
  backdrop_path?: string,
  budget?: number,
  genres?: string[],
  homepage?: string,
  imdb_id?: string,
  original_language?: string,
  overview?: string,
  popularity?: number,
  poster_path?: string,
  release_date?: string,
  revenue?: number,
  runtime?: number,
  status?: string,
  tagline?: string,
  title?: string,
  vote_average?: number,
  vote_count?: number,
  cast?: Cast[]
}
