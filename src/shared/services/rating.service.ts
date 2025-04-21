import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private storageKey = 'movie_ratings';

  private getRatings(): Record<string, number> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  getRating(movieId: string): number {
    const ratings = this.getRatings();
    return ratings[movieId] || 0;
  }

  getAllRatings(): { movieId: string; rating: number }[] {
    const ratings = this.getRatings();
    return Object.entries(ratings).map(([movieId, rating]) => ({
      movieId: movieId,
      rating
    }));
  }

  setRating(movieId: number, rating: number): void {
    const ratings = this.getRatings();
    ratings[movieId] = rating;
    localStorage.setItem(this.storageKey, JSON.stringify(ratings));
  }
}
