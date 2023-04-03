import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { TmdbApiService } from 'src/app/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: any
  constructor(private readonly route: ActivatedRoute, private readonly api: TmdbApiService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!Object.keys(params).includes('id')) {
        this.movie = ["No id provided"]
        return
      }

      if (!Number.isInteger(Number(params['id']))) {
        this.movie = ["Invalid id"]
        return
      }

      this.api.getMovie(params['id']).then(movie => {
        this.movie = Object.entries(movie.data)
      })
    })
  }
}
