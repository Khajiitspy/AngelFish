import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {LoadingComponent} from './components/loading/loading';
import {GlobalError} from './components/global-error/global-error';

@Component({
  selector: 'app-fish',
  imports: [RouterOutlet, RouterLink, LoadingComponent, GlobalError],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngelFish');
}
