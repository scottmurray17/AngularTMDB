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
  backdrop: string = '';
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

      this.api.getMovie(params['id']).then(movie => {
        this.movie = movie;
        if (movie.backdrop_path) this.backdrop = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
        this.loading = false;
      });
    })
  }
}
