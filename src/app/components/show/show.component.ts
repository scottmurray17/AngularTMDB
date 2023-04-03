import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'src/app/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent{
  show: any;
  constructor(private readonly route: ActivatedRoute, private readonly api: TmdbApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!Object.keys(params).includes('id')) {
        this.show = ["No id provided"];
        return;
      }

      if (!Number.isInteger(Number(params['id']))) {
        this.show = ["Invalid id"];
        return;
      }

      this.api.getPerson(params['id']).then(show => {
        this.show = Object.entries(show.data);
      });
    })
  }
}
