import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../interface/turno';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private apiUrl = `${environment.apiUrl}/turno`;

  constructor(private http: HttpClient) {}

  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }

  crearTurno(turno: any): Observable<any> {
    return this.http.post(this.apiUrl, turno);
  }

  actualizarTurno(turnoId: number, turno: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${turnoId}`, turno);
  }

  eliminarTurno(turnoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${turnoId}`);
  }
}
