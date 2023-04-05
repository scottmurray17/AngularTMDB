import { constants } from "../../../constants";
import axios from "axios";
import { Injectable } from "@angular/core";
import { Movie } from "src/app/models/movie.model";

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

@Injectable()
export class TmdbApiService {
  constructor() {}

  async getMovie(movieId: String) {
    try {
      const response = await axios.get(`${constants.API_URL}/movie/${movieId}`, config);
      return response.data as Movie;
    } catch {
      return {} as Movie
    }
  }

  async getShow(showId: String) {
    try {
      const response = await axios.get(`${constants.API_URL}/show/${showId}`, config);
      return response;
    } catch {
      return {
        data: ['Show not found']
      }
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
