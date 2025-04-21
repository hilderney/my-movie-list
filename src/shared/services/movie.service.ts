import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { environment } from '../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey = environment.tmdbApiKey;
  private baseUrl = environment.tmdbBaseUrl

  constructor(private http: HttpClient) { }

  searchMovies(query: string) {
    const url = query?.length > 0
      ? `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&language=pt-BR`
      : `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=pt-BR`;

    return this.http.get<any>(url).pipe(
      map(res => res.results)
    );
  }

  getMovieById(id: string) {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=pt-BR`;
    return this.http.get<any>(url);
  }
}
