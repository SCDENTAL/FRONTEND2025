import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Paciente } from '../interface/paciente';
import { Observable } from 'rxjs';
import { pacienteDTO } from '../interface/pacienteDTO';
import { environment } from '../../environments/environments.prod';



@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  
  private apiUrl = `${environment.apiUrl}/pacientes`;

  constructor(private http: HttpClient) {}

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  getPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  crearPaciente(paciente: pacienteDTO): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  actualizarPaciente(id: number, paciente: pacienteDTO): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente);
  }

  eliminarPaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
}
