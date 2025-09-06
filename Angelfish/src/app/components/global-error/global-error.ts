import {Component, Input} from '@angular/core';
import {GlobalErrorService} from '../../services/global-error.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-global-error',
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './global-error.html',
  styleUrl: './global-error.css'
})
export class GlobalError {
  constructor(public errorService: GlobalErrorService) {}
}
