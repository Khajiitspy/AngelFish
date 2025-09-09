import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { User } from './models/Account';
import { AccountService } from '../app/services/account.services';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading';
import { GlobalError } from './components/global-error/global-error';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-fish',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LoadingComponent, GlobalError, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngelFish');
  currentUser: User | null = null;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log('User changed:', user);
    });
  }

  logout() {
    this.accountService.logout();
  }

  protected readonly environment = environment;
}
