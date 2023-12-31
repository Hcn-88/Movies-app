import { Injectable } from '@angular/core';
import { Film } from '../../../Film';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  watchlistMovies:Film[] = this.getLocalStorage();

  constructor() { }

  setLocalStorage(key: string, value: Film[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage(): Film[] {
    // To prevent errors when running the application in environments where localStorage is not available
    if (typeof localStorage !== 'undefined') {
      const localStorageData = localStorage.getItem('watchlist');
      return localStorageData ? JSON.parse(localStorageData) : [];
    } else {
      console.error('localStorage is not available.');
      return [];
    }
  }

  checkMovieExists(movie: Film): boolean { 
    return this.watchlistMovies.some((m) => m.id === movie.id);
  }

  addToWatchlist(movie: Film) {
    const existingMovieIndex = this.watchlistMovies.findIndex(m => m.id === movie.id);
    if (existingMovieIndex !== -1) {
      this.watchlistMovies[existingMovieIndex] = movie;
    } else {
      this.watchlistMovies.push(movie);
    }
    this.setLocalStorage('watchlist', this.watchlistMovies);
  }

  removeFromWatchlist(movieTitle: string) {
    this.watchlistMovies = this.watchlistMovies.filter(movie => movie.title !== movieTitle);
    this.setLocalStorage('watchlist', this.watchlistMovies);
  }

}

