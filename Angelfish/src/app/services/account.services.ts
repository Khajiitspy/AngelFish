import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {RegisterResponse, User, TokenModel} from '../models/Account';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private tokenKey = 'auth_token';

  private apiUrl = `${environment.apiUrl}account/`;

  constructor(private http: HttpClient) {
    this.currentUserSubject.next(this.getCurrentUser());
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.currentUserSubject.next(this.getCurrentUser());
  }

  getDecodedToken(): any {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        return jwtDecode(token);
      } catch (e) {
        console.error('Invalid token', e);
        return null;
      }
    }
    return null;
  }

  getCurrentUser(): User | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;

    return {
      name: decoded['name'] || '',
      email: decoded['email'] || '',
      image: decoded['image'] || null
    };
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.tokenKey);
  }

  Register(formData: FormData) {
    return this.http.post<RegisterResponse>(this.apiUrl + "register", formData);
  }

  Login(formData: FormData) {
    return this.http.post<TokenModel>(this.apiUrl + "login", formData);
  }
}
