import { Routes } from '@angular/router';
import { SeriesComponent } from './series/series.component';
import { SongsComponent } from './songs/songs.component';
import { MoviesComponent } from './movies/movies.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'movies', component: MoviesComponent },
];
