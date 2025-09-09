import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../services/account.services';
import { Router } from '@angular/router';
import { serialize } from 'object-to-formdata';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  user = {email: '', password: ''}
  backendErrors: string[] = [];

  loginForm: FormGroup;

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.value;

    const formData = serialize(formValue);

    this.accountService.Login(formData).subscribe({
      next: (res) => {
        const token = res.token;
        this.accountService.saveToken(token);

        const user = this.accountService.getCurrentUser();
        console.log('Logged in user:', user);

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        if (err.error && Array.isArray(err.error)) {
          this.backendErrors = err.error;
        } else if (err.error && typeof err.error === 'string') {
          this.backendErrors = [err.error];
        } else {
          this.backendErrors = err.error.errors ?? ['Невідома помилка сервера.'];
        }
      }
    });

  }
}
