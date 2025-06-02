import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopRatedComponent } from './top-rated.component';
import { RatingService } from '../../../../shared/services/rating.service';
import { MoviesService } from '../../../../shared/services/movie.service';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TopRatedComponent', () => {
  let component: TopRatedComponent;
  let fixture: ComponentFixture<TopRatedComponent>;
  let ratingServiceSpy: jasmine.SpyObj<RatingService>;
  let movieServiceSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    ratingServiceSpy = jasmine.createSpyObj('RatingService', ['getAllRatings']);
    movieServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovieById']);

    await TestBed.configureTestingModule({
      declarations: [TopRatedComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: RatingService, useValue: ratingServiceSpy },
        { provide: MoviesService, useValue: movieServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora componentes filhos como app-movie-card
    }).compileComponents();

    fixture = TestBed.createComponent(TopRatedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalRated and averageRating', () => {
    const ratings = [
      { movieId: '1', rating: 4 },
      { movieId: '2', rating: 2 },
      { movieId: '3', rating: 5 }
    ];
    ratingServiceSpy.getAllRatings.and.returnValue(ratings);
    movieServiceSpy.getMovieById.and.returnValue(of({ genres: [] }));

    component.ngOnInit();

    expect(component.totalRated).toBe(3);
    expect(component.averageRating).toBeCloseTo((4 + 2 + 5) / 3, 2);
  });

  it('should process genre stats correctly', () => {
    const movies = [
      { genres: [{ name: 'Action' }, { name: 'Drama' }] },
      { genres: [{ name: 'Action' }] },
      { genres: [{ name: 'Comedy' }] }
    ];
    component.processGenreStats(movies);

    expect(component.favoriteGenres.length).toBeGreaterThan(0);
    expect(component.favoriteGenres[0].name).toBe('Action');
    expect(component.favoriteGenres[0].count).toBe(2);
  });

  it('should toggle stats visibility', () => {
    expect(component.showStats).toBeFalse();
    component.toggleStats();
    expect(component.showStats).toBeTrue();
    component.toggleStats();
    expect(component.showStats).toBeFalse();
  });
});
