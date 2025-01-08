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
      this.songs = [...this.songs,...this.songs,...this.songs]
    });
  }

  ngAfterViewInit(): void {
    const element = this.mediaList.nativeElement;
    let isScrolling = false;
    element.addEventListener('scroll', () => {
      const scrollLeft = element.scrollLeft;
      const maxScrollLeft = element.scrollWidth - element.clientWidth;
  
      if (scrollLeft >= maxScrollLeft - 1) {
        element.scrollLeft = element.scrollLeft - element.scrollWidth / 3;
      }
  
      if (scrollLeft <= 0) {
        element.scrollLeft = element.scrollLeft + element.scrollWidth / 3;
      }
    });

    element.addEventListener('wheel', (event: WheelEvent) => {
      if (isScrolling) return;
  
      event.preventDefault();
      isScrolling = true;
  
      element.scrollBy({
        left: event.deltaY < 0 ? -500 : 500,
        behavior: 'smooth',
      });
  
      setTimeout(() => {
        isScrolling = false;
      }, 300);
    });
  
    setTimeout(() => {
      element.scrollLeft = element.scrollWidth / 3;
      this.spinAnimation(element, element.scrollWidth / 3, element.scrollWidth / 3 + 5000, 750);
    });
  }
  
  private spinAnimation(element: HTMLElement, start: number, end: number, duration: number) {
    const distance = end - start;
    const startTime = performance.now();
  
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); 
      const scrollPosition = start + distance * progress;
  
      element.scrollLeft = scrollPosition;
  
      if (progress < 1) {
        requestAnimationFrame(animate); 
      } else {
        element.scrollLeft = element.scrollWidth / 3;
      }
    };
  
    requestAnimationFrame(animate);
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
