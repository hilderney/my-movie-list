import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    TopRatedComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule
  ]
})
export class MoviesModule { }
