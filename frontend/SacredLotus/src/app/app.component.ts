import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeriesComponent } from './series/series.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SeriesComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'SacredLotus';
}
