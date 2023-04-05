import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, tap } from 'rxjs';
import { SearchResult } from 'src/app/models/search-result.model';
import { TmdbApiService } from 'src/app/services/tmdb-api/tmdb-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  images: String[] = ['/assets/avatar.jpg', '/assets/breakingBad.jpg', '/assets/starWars.jpg', '/assets/theBigLebowski.jpg'];
  searchControl: FormControl = new FormControl();
  results?: SearchResult[];
  loading: boolean = false;

  constructor(private readonly api: TmdbApiService) {}

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      tap(() => {
        this.loading = true;
      }),
      debounceTime(1000),
      filter((value: string) => value.length > 3)
    ).subscribe((value) => {
      this.api.search(value).then(result => this.results=result)
      this.loading = false;
    })
  }


}
