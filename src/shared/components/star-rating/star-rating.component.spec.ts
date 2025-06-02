import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StarRatingComponent } from './star-rating.component';
import { TranslateModule } from '@ngx-translate/core';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarRatingComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 stars', () => {
    const stars = fixture.debugElement.queryAll(By.css('.star'));
    expect(stars.length).toBe(5);
  });

  it('should fill stars up to the rating', () => {
    component.rating = 3;
    fixture.detectChanges();
    const filledStars = fixture.debugElement.queryAll(By.css('.star.filled'));
    expect(filledStars.length).toBe(3);
  });

  it('should emit rated event when a star is clicked', () => {
    spyOn(component.rated, 'emit');
    const stars = fixture.debugElement.queryAll(By.css('.star'));
    stars[2].nativeElement.click(); // The third Star / pos 2
    expect(component.rated.emit).toHaveBeenCalledWith(3);
    expect(component.rating).toBe(3);
  });

  it('should update rating when setRating is called', () => {
    component.setRating(4);
    expect(component.rating).toBe(4);
  });
});
