import { Injectable } from '@angular/core';
import { Film } from '../../../Film';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  watchlistMovies:Film[] = [];

  constructor() { }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getLocalStorage(): Film[] {
    const localStorageData = localStorage.getItem('watchlist');
    return localStorageData ? JSON.parse(localStorageData) : [];
  }

  addToWatchlist(movie: Film) {
    const isInWatchlist = this.checkMovieExists(movie);
    if (!isInWatchlist) {
      this.watchlistMovies.push(movie);
      this.setLocalStorage('watchlist', JSON.stringify(this.watchlistMovies));
    } else {
      return;
    }
  }

  removeFromWatchlist(movieTitle: string) {
    const movieList = this.getLocalStorage();
    const movieIndexToRemove = movieList.findIndex((movie) => movie.title === movieTitle);
    if (movieIndexToRemove !== -1) {
      movieList.splice(movieIndexToRemove, 1);
      localStorage.setItem('watchlist', JSON.stringify(movieList));
    }
  }

  checkMovieExists(movie: Film): boolean { 
    const watchlistMovies = this.getLocalStorage();
    return watchlistMovies.some((m) => m.id === movie.id);
  }

}
