import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, Observable } from 'rxjs';
import { MoviesService } from '../../../../shared/services/movie.service';
import { RatingService } from '../../../../shared/services/rating.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailComponent {
  movie$!: Observable<any>;
  movieId = '';
  userRating = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private moviesService: MoviesService,
    private ratingService: RatingService
  ) {
    console.log('MovieDetailComponent constructor');
    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.movieId = params.get('id')!;
        this.userRating = this.ratingService.getRating(this.movieId);
        return this.moviesService.getMovieById(this.movieId);
      })
    );
  }

  getGenres(genres: any[]): string {
    return genres.map(x => x.name).join(', ');
  }

  goBack(): void {
    this.location.back(); // Navega para a página anterior
  }

  onRated(movieRating: number) {
    this.userRating = movieRating;
    this.ratingService.setRating(this.movieId, movieRating);
  }
}
