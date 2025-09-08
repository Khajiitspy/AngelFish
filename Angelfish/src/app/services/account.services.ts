import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegisterUser, RegisterResponse, User} from '../models/Account';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private tokenKey = 'auth_token';

  private apiUrl = `${environment.apiUrl}account/`;

  constructor(private http: HttpClient) { }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getDecodedToken(): any {
    const token = this.getToken();
    console.log(token);
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
    localStorage.removeItem(this.tokenKey);
  }

  Register(formData: FormData) {
    return this.http.post<RegisterResponse>(this.apiUrl + "register", formData);
  }
}
