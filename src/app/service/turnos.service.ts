import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnoDetalleDTO } from '../interface/TurnoDTO/TurnoDetalleDTO';
import { CrearTurnoDTO } from '../interface/TurnoDTO/CrearTurnoDTO';
import { EditarTurnoDTO } from '../interface/TurnoDTO/EditarTurnoDTO';
import { Turno } from '../interface/turno';
import { ReservarTurnoDTO } from '../interface/TurnoDTO/ReservarTurnoDTO';
import { TurnoOdontologo } from '../interface/turno-odontologo';

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

  constructor(private http: HttpClient) { }

  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.baseUrl}/mi-calendario`, this.httpOptions);
  }

  getTurnosDelDiaOdontologo(): Observable<TurnoOdontologo[]> {
    return this.http.get<TurnoOdontologo[]>(`${this.baseUrl}/mis-turnos-hoy`, this.httpOptions);
  }

  getTurno(id: number): Observable<TurnoDetalleDTO> {
    return this.http.get<TurnoDetalleDTO>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  crearTurno(calendarioId: number, turno: CrearTurnoDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear/${calendarioId}`, turno, this.httpOptions);
  }

  marcarAsistencia(turnoId: number, dto: { asistio: boolean }) {
    return this.http.put(`${this.baseUrl}/${turnoId}/asistencia`, dto);
  }


  cancelarTurno(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/cancelar`, {}, this.httpOptions);
  }



  getTurnosPorCalendario(calendarioId: number): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.baseUrl}/${calendarioId}`, this.httpOptions);
  }

  getTurnosPorSemana(calendarioId: number, fechaInicio: string, fechaFin: string): Observable<Turno[]> {
    return this.http.get<Turno[]>(
      `${this.baseUrl}/por-semana/${calendarioId}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
      this.httpOptions
    );
  }





  reservarTurno(turnoId: number, dto: ReservarTurnoDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservar/${turnoId}`, dto);
  }

  editarTurno(id: number, datos: EditarTurnoDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar/${id}`, datos);
  }


}
