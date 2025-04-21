import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Output() rated = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  setRating(value: number) {
    this.rating = value;
    this.rated.emit(value);
    console.log(value)
  }
}
