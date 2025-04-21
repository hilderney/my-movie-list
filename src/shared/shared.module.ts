import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { RouterModule } from '@angular/router';
import { StarRatingComponent } from './components/star-rating/star-rating.component';



@NgModule({
  declarations: [
    MovieCardComponent,
    StarRatingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MovieCardComponent
  ]
})
export class SharedModule { }
