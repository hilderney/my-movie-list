import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { TopRatedComponent } from './top-rated/top-rated.component';

const routes: Routes = [
  {
    path: 'list',
    component: MovieListComponent
  },
  {
    path: 'details/:id',
    component: MovieDetailComponent
  },
  {
    path: 'top-rated',
    component: TopRatedComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'movies'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
