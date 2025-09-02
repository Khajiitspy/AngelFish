import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/Category';
import { CommonModule } from '@angular/common';
import {environment} from '../../../environments/environment';
import {RouterLink} from '@angular/router';
import { serialize } from 'object-to-formdata';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
      console.log("Home page on init");
      this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log("categories", categories);
    });
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Ви впевнені, що хочете видалити цю категорію?')) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: (message: string) => {
          this.categories = this.categories.filter(c => c.id !== categoryId);
          console.log('Сервер відповів:', message);
        },
        error: (error) => {
          this.categories = this.categories.filter(c => c.id !== categoryId);
          console.error('Помилка при видаленні категорії:', error);
        }
      });
    }
  }

  protected readonly environment = environment;
}
