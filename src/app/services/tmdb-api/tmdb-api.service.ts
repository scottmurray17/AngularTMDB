import { constants } from "../../../constants";
import axios from "axios";
import { Injectable } from "@angular/core";
import { Movie } from "src/app/models/movie.model";
import { Show } from "src/app/models/show.model";

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

@Injectable()
export class TmdbApiService {
  constructor() {}

  async getMovie(movieId: String): Promise<Movie> {
    try {
      const response = await axios.get(`${constants.API_URL}/movie/${movieId}`, config);
      return response.data as Movie;
    } catch {
      return {} as Movie;
    }
  }

  async getShow(showId: String): Promise<Show> {
    try {
      const response = await axios.get(`${constants.API_URL}/show/${showId}`, config);
      return response.data as Show;
    } catch {
      return {} as Show;
    }
  }

  async getPerson(personId: String) {
    try {
      const response = await axios.get(`${constants.API_URL}/show/${personId}`, config);
      return response;
    } catch {
      return {
        data: ['Person not found']
      }
    }
  }
}
