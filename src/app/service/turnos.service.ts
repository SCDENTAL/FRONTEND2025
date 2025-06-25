import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnoDetalleDTO } from '../interface/TurnoDTO/TurnoDetalleDTO';
import { CrearTurnoDTO } from '../interface/TurnoDTO/CrearTurnoDTO';
import { EditarTurnoDTO } from '../interface/TurnoDTO/EditarTurnoDTO';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private baseUrl = 'https://localhost:7292/api/Turno';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}
  
  getTurnos(): Observable<TurnoDetalleDTO[]> {
    return this.http.get<TurnoDetalleDTO[]>(`${this.baseUrl}/mi-calendario`, this.httpOptions);
  }

  getTurno(id: number): Observable<TurnoDetalleDTO> {
    return this.http.get<TurnoDetalleDTO>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  crearTurno(calendarioId: number, turno: CrearTurnoDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear/${calendarioId}`, turno, this.httpOptions);
  }

  editarTurno(id: number, turno: EditarTurnoDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, turno, this.httpOptions);
  }

  cancelarTurno(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/cancelar`, {}, this.httpOptions);
  }

  marcarAsistencia(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/asistencia`, {}, this.httpOptions);
  }

  reservarTurno(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservar/${id}`, {}, this.httpOptions);
  }

  
}
