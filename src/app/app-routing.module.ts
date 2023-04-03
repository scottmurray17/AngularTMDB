import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';
import { PersonComponent } from './components/person/person.component';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [
  { path: 'movie', component: MovieComponent },
  { path: 'show', component: ShowComponent },
  { path: 'person', component: PersonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
