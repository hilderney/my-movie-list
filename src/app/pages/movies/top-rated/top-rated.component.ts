import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RatingService } from '../../../../shared/services/rating.service';
import { MoviesService } from '../../../../shared/services/movie.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss'],
  animations: [
    trigger('slideToggle', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class TopRatedComponent implements OnInit {
  totalRated = 0;
  averageRating = 0;
  favoriteGenres: { name: string; count: number }[] = [];
  topMovies: any[] = [];
  showStats = false;

  constructor(
    private ratingService: RatingService,
    private movieService: MoviesService
  ) { }

  ngOnInit(): void {
    const allRatings = this.ratingService
      .getAllRatings()
      .sort((a, b) => b.rating - a.rating);

    this.totalRated = allRatings.length;
    this.averageRating =
      allRatings.reduce((acc, r) => acc + r.rating, 0) / this.totalRated;

    const top10 = allRatings.slice(0, 10);
    const requests = top10.map(r => this.movieService.getMovieById(r.movieId));

    forkJoin(requests).subscribe(results => {
      this.topMovies = results;
      this.processGenreStats(results);
    });
  }

  processGenreStats(movies: any[]) {
    const genreMap: Record<string, number> = {};

    movies.forEach(movie => {
      movie.genres?.forEach((genre: any) => {
        genreMap[genre.name] = (genreMap[genre.name] || 0) + 1;
      });
    });

    this.favoriteGenres = Object.entries(genreMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  toggleStats() {
    this.showStats = !this.showStats;
  }
}
