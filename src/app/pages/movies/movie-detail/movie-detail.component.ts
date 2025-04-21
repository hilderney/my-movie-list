import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, Observable } from 'rxjs';
import { MoviesService } from '../../../../shared/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailComponent implements OnInit {
  movie$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private moviesService: MoviesService
  ) {
    console.log('MovieDetailComponent constructor');
    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => this.moviesService.getMovieById(params.get('id')!))
    );
  }

  ngOnInit(): void {
    console.log('MovieDetailComponent OnInit called');
  }

  getGenres(genres: any[]): string {
    return genres.map(x => x.name).join(', ');
  }

  goBack(): void {
    this.location.back(); // Navega para a página anterior
  }
}
