import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, of, startWith, switchMap } from 'rxjs';
import { MoviesService } from '../../../../shared/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  searchControl = new FormControl<string | null>('');
  movies$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((query: string | null) => this.moviesService.searchMovies(query || '')),
    catchError(() => of([]))
  );

  constructor(private moviesService: MoviesService) {
    console.log('MOVIE LIST CONSTRUCTOR');
  }

  ngOnInit(): void { }

}
