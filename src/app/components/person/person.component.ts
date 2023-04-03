import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'src/app/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person: any;
  constructor(private readonly route: ActivatedRoute, private readonly api: TmdbApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!Object.keys(params).includes('id')) {
        this.person = ["No id provided"];
        return;
      }

      if (!Number.isInteger(Number(params['id']))) {
        this.person = ["Invalid id"];
        return;
      }

      this.api.getPerson(params['id']).then(person => {
        this.person = Object.entries(person.data);
      });
    })
  }
}
