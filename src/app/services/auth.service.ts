import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
    tap((res: any) => {
      if (res?.data?.access_token) {
        this.storeToken(res.data.access_token);
      }
    })
  );
}


  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  storeToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
