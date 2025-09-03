import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category, ICategoryDelete} from '../models/Category';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private apiUrl = `${environment.apiUrl}categories/`;

  constructor(private http: HttpClient) { }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + 'list');
  }

  createCategory(formData: FormData) {
    return this.http.post(this.apiUrl + "create", formData);
  }

  updateCategory(formData: FormData) {
    return this.http.put(this.apiUrl + "update", formData);
  }

  deleteCategory(id: number): Observable<string> {
    return this.http.request<string>('delete', this.apiUrl + 'delete', {
      body: { id }
    });
  }

  getCategory(slug: string): Observable<Category> {
    return this.http.get<Category>(this.apiUrl + slug );
  }
}
