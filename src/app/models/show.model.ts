import { Cast } from "./cast.model";

export interface Show {
  backdrop_path: string,
  genres: string[],
  overview: string,
  poster_path: string,
  first_air_date: string,
  seasons: number,
  tagline: string,
  name: string,
  vote_average: number,
  cast: Cast[]
}
