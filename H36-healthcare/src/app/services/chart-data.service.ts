import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private apiUrl = environment.chartUrl;
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {}

  getSummaryData(): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/summary-chart`, {headers});
  }

  getReportsData(): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/reports-chart`, {headers});
  }
}