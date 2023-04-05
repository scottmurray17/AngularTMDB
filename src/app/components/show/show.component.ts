import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Show } from 'src/app/models/show.model';
import { TmdbApiService } from 'src/app/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent{
  show?: Show;
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

      this.api.getShow(params['id']).then((show: Show) => {
        this.show = show;
        if (show.backdrop_path) this.backdrop = `https://image.tmdb.org/t/p/original/${show.backdrop_path}`;
        if (show.poster_path) this.poster = `https://image.tmdb.org/t/p/w500/${show.poster_path}`;
        if (show.name && show.first_air_date) this.title = `${show.name} (${show.first_air_date.slice(0,4)})`;
        else if (show.name) this.title = show.name;
        this.loading = false;
      });
    })
  }
}
