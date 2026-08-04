import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WhatsappService, WhatsAppStats } from '../../service/whatsapp.service';

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.scss'
})
export class WhatsappComponent implements OnInit {
  stats: WhatsAppStats | null = null;
  loading = true;
  error = false;

  constructor(private whatsappService: WhatsappService) {}

  ngOnInit() {
    this.whatsappService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  get tasaConfirmacion(): number {
    if (!this.stats || this.stats.mensajesMesActual === 0) return 0;
    return Math.round((this.stats.turnosConfirmadosMesActual / this.stats.mensajesMesActual) * 100);
  }

  get coberturaTelefono(): number {
    if (!this.stats) return 0;
    const total = this.stats.pacientesConTelefono + this.stats.pacientesSinTelefono;
    if (total === 0) return 0;
    return Math.round((this.stats.pacientesConTelefono / total) * 100);
  }

  get variacionMensual(): number | null {
    if (!this.stats || this.stats.mensajesMesAnterior === 0) return null;
    return Math.round(((this.stats.mensajesMesActual - this.stats.mensajesMesAnterior) / this.stats.mensajesMesAnterior) * 100);
  }
}
