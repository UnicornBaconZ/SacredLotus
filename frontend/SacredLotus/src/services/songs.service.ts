import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiSongItem, SongItem } from '../models/song-item.model';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private apiUrl = 'http://localhost:3000/api/songs';

  constructor(private http: HttpClient) {}

  getSongs(): Observable<SongItem[]> {
    return this.http.get<ApiSongItem[]>(this.apiUrl).pipe(
      map((songs: ApiSongItem[]) =>
        songs.map((song: ApiSongItem) => ({
          title: song.Title,
          artist: song.Artist,
          songFile: song.SongFile,
          songImage: song.SongImage,
        }))
      )
    );
  }
}
