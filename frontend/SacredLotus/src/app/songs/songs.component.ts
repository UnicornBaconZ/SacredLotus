import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsService } from '../../services/songs.service';
import { SongItem } from '../../models/song-item.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-songs',
  imports: [CommonModule, MatIconModule],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit, AfterViewInit {
  @ViewChild('mediaList') mediaList!: ElementRef;
  songs: SongItem[] = [];
  currentPlayingAudio: HTMLAudioElement | null = null;
  currentPlayingButton: HTMLElement | null = null;

  constructor(private songsService: SongsService) {}

  ngOnInit(): void {
    this.songsService.getSongs().subscribe((data) => {
      this.songs = data;
      this.songs.concat(data)
      this.songs.concat(data)
    });
  }

  ngAfterViewInit(): void {
    const element = this.mediaList.nativeElement;

    element.addEventListener('wheel', (event: WheelEvent) => {
      event.preventDefault();
      element.scrollBy({
        left: event.deltaY < 0 ? -100 : 100,
        behavior: 'instant',
      });
    });
  }

  toggleAudio(audio: HTMLAudioElement, event: Event): void {
    const button = event.target as HTMLElement;
    const icon = button.querySelector('i') as HTMLElement;
  
    if (this.currentPlayingAudio && this.currentPlayingAudio !== audio) {
      this.currentPlayingAudio.pause();
      this.currentPlayingAudio.currentTime = 0;
    }
  
    if (audio.paused) {
      audio.play();

      this.currentPlayingAudio = audio;
      this.currentPlayingButton = button;
    } else {
      audio.pause();
      this.currentPlayingAudio = null;
      this.currentPlayingButton = null;
    }
  }
  

  seekAudio(audio: HTMLAudioElement, event: Event): void {
    const progressBar = event.target as HTMLInputElement;
    const seekTime = (parseFloat(progressBar.value) / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
  
  updateProgressBar(audio: HTMLAudioElement, progressBar: HTMLInputElement): void {
    const progress = (audio.currentTime / audio.duration) * 100 || 0;
    progressBar.value = progress.toString();
    progressBar.style.setProperty('--progress', `${progress}%`);
  }
}
