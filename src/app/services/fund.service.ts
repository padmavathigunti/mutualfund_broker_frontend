// src/app/services/fund.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FundService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      })
    };
  }

  getFundHouses(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/fundhouses/`, this.getHeaders());
  }

  getSchemesByFundHouse(fundHouseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/schemes/${fundHouseId}/`, this.getHeaders());
  }

  getPortfolio(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/portfolio/`, this.getHeaders());
  }

  addToPortfolio(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/portfolio/`, payload, this.getHeaders());
  }
}
