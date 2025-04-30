
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'https://localhost:7292/api/auth';

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
