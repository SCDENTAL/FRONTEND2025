import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments.prod';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string, nombre: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, { email, password, nombre });
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
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

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
