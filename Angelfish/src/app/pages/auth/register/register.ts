import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../services/account.services';
import { RegisterUser } from '../../../models/Account';
import { Router } from '@angular/router';
import { serialize } from 'object-to-formdata';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  user: RegisterUser = { firstName: '', lastName: '', email: '', password: ''};
  selectedImage: string | ArrayBuffer | null = null;
  backendErrors: string[] = [];

  registerForm: FormGroup;

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private router: Router) {

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      imageFile: [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if(file) {
      if (!file.type.startsWith('image/')) {
        alert("Оберіть фото!");
        return;
      }
      this.registerForm.patchValue({
        imageFile: file
      });
      this.registerForm.get('imageFile')?.updateValueAndValidity();
      this.selectedImage = URL.createObjectURL(file);
    }
    else {
      this.registerForm.patchValue({
        imageFile: null
      });
      this.selectedImage = null;
    }

  }

  onSubmit() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;

    const formData = serialize(formValue);

    this.accountService.Register(formData).subscribe({
      next: (res) => {
        const token = res.userToken;
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
