import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  mediaItems: any[] = [];

  constructor(
    private mediaService: MediaService
  ){}

  ngOnInit(): void {
    this.mediaService.getMovieItems().subscribe((data) => {
      console.log(data)
      this.mediaItems = data;
    })
  }
}
