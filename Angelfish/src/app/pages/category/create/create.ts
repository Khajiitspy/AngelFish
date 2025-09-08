import { Component } from '@angular/core';
import { ICategoryCreate } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { serialize } from 'object-to-formdata';

@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class CategoryCreate {
  category: ICategoryCreate = { name: '', slug: '' };
  imagePreview: string | ArrayBuffer | null = null;
  backendErrors: string[] = [];

  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder,
              private router: Router) {

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
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
      this.categoryForm.patchValue({
        imageFile: file
      });
      this.categoryForm.get('imageFile')?.updateValueAndValidity();
      this.imagePreview = URL.createObjectURL(file);
    }
    else {
      this.categoryForm.patchValue({
        imageFile: null
      });
      this.imagePreview = null;
    }

  }

  onSubmit() {

    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;

    }

    console.log('Form valid', this.categoryForm.value);

    // наш обʼєкт з форми
    const formValue = this.categoryForm.value;

    // перетворюємо в FormData
    const formData = serialize(formValue);

    // this.backendErrors = [];

    this.categoryService.createCategory(formData).subscribe({
      next: (res) => {
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
