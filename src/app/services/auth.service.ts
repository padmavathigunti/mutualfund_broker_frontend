import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/token/`, { email, password });
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  storeToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}