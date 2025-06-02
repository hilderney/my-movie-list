import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MoviesService } from '../../../../shared/services/movie.service';
import { RatingService } from '../../../../shared/services/rating.service';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
  let ratingServiceSpy: jasmine.SpyObj<RatingService>;
  let locationSpy: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovieById']);
    ratingServiceSpy = jasmine.createSpyObj('RatingService', ['getRating', 'setRating']);
    locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: RatingService, useValue: ratingServiceSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => key === 'id' ? '123' : null
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goBack and use Location.back()', () => {
    component.goBack();
    expect(locationSpy.back).toHaveBeenCalled();
  });

  it('should call onRated and set rating', () => {
    component.movieId = '123';
    component.onRated(4);
    expect(component.userRating).toBe(4);
    expect(ratingServiceSpy.setRating).toHaveBeenCalledWith('123', 4);
  });

  it('should get genres as comma separated string', () => {
    const genres = [{ name: 'Action' }, { name: 'Drama' }];
    expect(component.getGenres(genres)).toBe('Action, Drama');
  });

  it('should initialize movie$ with correct movie and rating', (done) => {
    const mockMovie = { id: '123', title: 'Test Movie', genres: [] };
    moviesServiceSpy.getMovieById.and.returnValue(of(mockMovie));
    ratingServiceSpy.getRating.and.returnValue(5);

    component.movie$.subscribe(movie => {
      expect(moviesServiceSpy.getMovieById).toHaveBeenCalledWith('123');
      expect(ratingServiceSpy.getRating).toHaveBeenCalledWith('123');
      expect(movie).toEqual(mockMovie);
      expect(component.userRating).toBe(5);
      done();
    });
  });
});
