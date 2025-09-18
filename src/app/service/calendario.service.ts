import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarioDTO } from '../interface/CalendarioDTO/calendariodto';
import { CrearCalendarioDTO } from '../interface/CalendarioDTO/crearcalendariodto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments.prod';




@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  
  private apiUrl = `${environment.apiUrl}/Calendario`;

  constructor(private http: HttpClient) {}

  crearCalendario(dto: CrearCalendarioDTO): Observable<CalendarioDTO> {
    return this.http.post<CalendarioDTO>(this.apiUrl, dto);
  }

  obtenerCalendarios(): Observable<CalendarioDTO[]> {
    return this.http.get<CalendarioDTO[]>(this.apiUrl);
  }

  obtenerCalendarioPorId(id: number): Observable<CalendarioDTO> {
    return this.http.get<CalendarioDTO>(`${this.apiUrl}/${id}`);
  }
  
  editarCalendario(id: number, dto: CrearCalendarioDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  extenderCalendario(id: number, dto: { fechaFin: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/extender`, dto);
  }
  
  // eliminarCalendario(id:number): Observable<void> {
  //   return this.http.delete<void>(this.apiUrl);
  // }
  eliminarCalendario(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`); // ✅ Enviamos el id
}




  
}
