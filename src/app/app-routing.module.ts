import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';
import { SearchComponent } from './components/search/search.component';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'show', component: ShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
