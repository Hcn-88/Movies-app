import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MovieServiceService } from '../../services/movie-service.service';
import { StorageServiceService } from './../../services/storage-service.service';
import { Film } from '../../../../Film';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  movieDetails: Film;
  safeUrl: SafeResourceUrl;
  youtubeUrl: string;

  constructor(private data:MovieServiceService, 
              private sanitizer:DomSanitizer, 
              private storage: StorageServiceService) {}
  
  ngOnInit(): void {
    this.movieDetails = this.data.selectedMovie;
    this.youtubeUrl = this.movieDetails.trailerUrl;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrl);
  }

  addMovie(movie: Film) {
    this.storage.addToWatchlist(movie);
  }

  removeMovie(movieTitle: string) {
    this.storage.removeFromWatchlist(movieTitle)
  }

  isInWatchlist(movie: Film): boolean {
    return this.storage.checkMovieExists(movie);
  }


}
