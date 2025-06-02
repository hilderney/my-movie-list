import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MoviesService } from '../../../../shared/services/movie.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['searchMovies']);

    await TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchMovies on init and when searchControl changes', (done) => {
    const mockMovies = [{ title: 'Movie 1' }, { title: 'Movie 2' }];
    moviesServiceSpy.searchMovies.and.returnValue(of(mockMovies));

    component.searchControl.setValue('test');
    fixture.detectChanges();

    component.movies$.subscribe(movies => {
      expect(moviesServiceSpy.searchMovies).toHaveBeenCalledWith('test');
      expect(movies).toEqual(mockMovies);
      done();
    });
  });

  it('should handle errors from searchMovies gracefully', (done) => {
    moviesServiceSpy.searchMovies.and.throwError('API error');

    component.searchControl.setValue('error');
    fixture.detectChanges();

    component.movies$.subscribe(movies => {
      expect(movies).toEqual([]);
      done();
    });
  });
});
