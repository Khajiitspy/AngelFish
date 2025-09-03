import { Component, OnInit } from '@angular/core';
import { ICategoryEdit } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { serialize } from 'object-to-formdata';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-edit',
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class CategoryEdit implements OnInit {
  category: ICategoryEdit = { id: 1, name: '', slug: ''};
  imagePreview: string | ArrayBuffer | null = null;
  backendErrors: string[] = [];

  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      imageFile: [null],
    })
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug){
      this.getCategory(slug);
    }
  }

  getCategory(slug: string) {
    this.categoryService.getCategory(slug).subscribe({
      next: (category) => {
        this.category = category;

        this.categoryForm.patchValue({
          name: category.name,
          slug: category.slug,
        });

        if (category.image) {
          this.imagePreview = `${environment.imagePath}800_${category.image}`
        }
      },
      error: (err) => {
        console.error('Failed to fetch category:', err);
      }
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

    console.log(this.category);

  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const formValue = this.categoryForm.value;

    const dataToSend: ICategoryEdit = {
      id: this.category.id,
      name: formValue.name,
      slug: formValue.slug,
      imageFile: formValue.imageFile
    };

    const formData = serialize(dataToSend);

    this.backendErrors = [];

    this.categoryService.updateCategory(formData).subscribe({
      next: () => this.router.navigate(['/']),
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
