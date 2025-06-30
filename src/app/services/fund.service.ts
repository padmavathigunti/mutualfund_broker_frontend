import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FundService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private authService: AuthService) {}


  getHeaders() {
  const token = this.authService.getToken();
  console.log('Token from localStorage:', token);

  if (!token) return {};

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  console.log('Final headers:', headers.get('Authorization'));

  return { headers };
}

  getFundHouses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fundhouses/`, this.getHeaders());
  }

  getSchemesByFundHouse(fundHouseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/schemes/${fundHouseId}/`, this.getHeaders());
  }

  getPortfolio(): Observable<any> {
    return this.http.get(`${this.baseUrl}/portfolio/`, this.getHeaders());
  }

  addToPortfolio(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/portfolio/`, payload, this.getHeaders());
  }

  saveFundHouses(): Observable<any> {
  return this.http.post(`${this.baseUrl}/fundhouses`, null, this.getHeaders());
}

  saveSchemes(): Observable<any> {
  return this.http.post(`${this.baseUrl}/schemes/save`, null, this.getHeaders());
}

}
