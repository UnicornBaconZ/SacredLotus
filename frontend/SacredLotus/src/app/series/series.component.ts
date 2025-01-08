import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
  mediaItems: any[] = [];

  constructor(
    private mediaService: MediaService
  ){}

  ngOnInit(): void {
    this.mediaService.getSerieItems().subscribe((data) => {
      this.mediaItems = data;
    })
  }
}
