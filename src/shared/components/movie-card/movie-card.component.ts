import { Component, Input, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: any;
  userRating = 0;

  get imageUrl(): string {
    return this.movie?.poster_path
      ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
      : 'assets/img/noimgplaceholder.png'; // coloque uma imagem padrão em caso de ausência
  }

  constructor(private ratingService: RatingService) { }

  ngOnInit() {
    this.userRating = this.ratingService.getRating(this.movie.id);
  }

  onRated(movieRating: number) {
    this.userRating = movieRating;
    this.ratingService.setRating(this.movie.id, movieRating);
  }

}
