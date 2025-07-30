import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnoDetalleDTO } from '../interface/TurnoDTO/TurnoDetalleDTO';
import { CrearTurnoDTO } from '../interface/TurnoDTO/CrearTurnoDTO';
import { EditarTurnoDTO } from '../interface/TurnoDTO/EditarTurnoDTO';
import { Turno } from '../interface/turno';
import { ReservarTurnoDTO } from '../interface/TurnoDTO/ReservarTurnoDTO';
import { TurnoOdontologo } from '../interface/turno-odontologo';
import { environment } from '../../environments/environments.prod';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  
  private apiUrl = `${environment.apiUrl}/Turno`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/mi-calendario`, this.httpOptions);
  }

  getTurnosDelDiaOdontologo(): Observable<TurnoOdontologo[]> {
    return this.http.get<TurnoOdontologo[]>(`${this.apiUrl}/mis-turnos-hoy`, this.httpOptions);
  }

  getTurno(id: number): Observable<TurnoDetalleDTO> {
    return this.http.get<TurnoDetalleDTO>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  crearTurno(calendarioId: number, turno: CrearTurnoDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear/${calendarioId}`, turno, this.httpOptions);
  }

  marcarAsistencia(turnoId: number, dto: { asistio: boolean }) {
    return this.http.put(`${this.apiUrl}/${turnoId}/asistencia`, dto);
  }


  cancelarTurno(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancelar`, {}, this.httpOptions);
  }



  getTurnosPorCalendario(calendarioId: number): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/${calendarioId}`, this.httpOptions);
  }

  getTurnosPorSemana(calendarioId: number, fechaInicio: string, fechaFin: string): Observable<Turno[]> {
    return this.http.get<Turno[]>(
      `${this.apiUrl}/por-semana/${calendarioId}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
      this.httpOptions
    );
  }





  reservarTurno(turnoId: number, dto: ReservarTurnoDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservar/${turnoId}`, dto);
  }

  editarTurno(id: number, datos: EditarTurnoDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${id}`, datos);
  }


}
