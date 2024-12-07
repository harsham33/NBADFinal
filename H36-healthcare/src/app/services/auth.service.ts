import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = environment.authUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  constructor(private http: HttpClient, private router: Router) {
    this.checkInitialToken();
  }

  private checkInitialToken(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(!!token);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
  }

  login(credentials: User): Observable<AuthResponse> {
    // // TODO: Replace with actual API call
    // if (credentials.email && credentials.password) {
    //   const mockResponse: AuthResponse = {
    //     token: 'mock-jwt-token',
    //     user: {
    //       email: credentials.email,
    //       id: '1'
    //     }
    //   };
    //   this.setToken(mockResponse.token);
    //   return of(mockResponse);
    // }
    // return throwError(() => new Error('Invalid credentials'));

    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.setToken(response.token);
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => new Error(error.error?.message || 'Login failed'));
        })
      );
  }

  signup(user: User): Observable<AuthResponse> {
    // if (user.email && user.password) {
    //   return this.http.post(`${this.API_URL}/auth/signup`, user);
    // }
    // return throwError(() => new Error('Invalid user data'));
    return this.http.post<AuthResponse>(`${this.API_URL}/signup`, user)
      .pipe(
        catchError(error => {
          console.error('Signup error:', error);
          return throwError(() => new Error(error.error?.message || 'Signup failed'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}