import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface WhatsAppStats {
  mensajesMesActual: number;
  mensajesMesAnterior: number;
  mensajesTotal: number;
  turnosConfirmadosMesActual: number;
  pacientesConTelefono: number;
  pacientesSinTelefono: number;
  costoMesActual: number;
  costoEstimadoMensual: number;
  promedioMensajesMensual: number;
  costoPorMensaje: number;
  turnosReservadosMesActual: number;
}

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  private apiUrl = `${environment.apiUrl}/whatsapp`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<WhatsAppStats> {
    return this.http.get<WhatsAppStats>(`${this.apiUrl}/stats`);
  }

  enviarRecordatorio(turnoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar/${turnoId}`, {});
  }
}
