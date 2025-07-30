import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObraSocial } from '../interface/obra-social';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments.prod';


@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {

  private apiUrl = `${environment.apiUrl}/obrasSociales`;

  constructor(private http: HttpClient) {}

  getObrasSociales(): Observable<ObraSocial[]> {
    return this.http.get<ObraSocial[]>(this.apiUrl);
  }

  getObraSocial(id: number): Observable<ObraSocial> {
    return this.http.get<ObraSocial>(`${this.apiUrl}/${id}`);
  }

  crearObraSocial(obraSocial: ObraSocial): Observable<ObraSocial> {
    return this.http.post<ObraSocial>(this.apiUrl, obraSocial);
  }

  actualizarObraSocial(id: number, obraSocial: ObraSocial): Observable<ObraSocial> {
    return this.http.put<ObraSocial>(`${this.apiUrl}/${id}`, obraSocial);
  }

  eliminarObraSocial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

