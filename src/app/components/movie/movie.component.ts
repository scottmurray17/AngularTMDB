import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { TmdbApiService } from 'src/app/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie?: Movie;
  title: string = '';
  backdrop: string = '';
  poster: string = '';
  loading: boolean = true;
  constructor(private readonly route: ActivatedRoute, private readonly api: TmdbApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!Object.keys(params).includes('id')) {
        this.loading = false;
        return;
      }

      if (!Number.isInteger(Number(params['id']))) {
        this.loading = false;
        return;
      }

      this.api.getMovie(params['id']).then((movie: Movie) => {
        this.movie = movie;
        if (movie.backdrop_path) this.backdrop = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
        if (movie.poster_path) this.poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        if (movie.title && movie.release_date) this.title = `${movie.title} (${movie.release_date.slice(0,4)})`;
        else if (movie.title) this.title = movie.title;
        this.loading = false;
      });
    })
  }
}
