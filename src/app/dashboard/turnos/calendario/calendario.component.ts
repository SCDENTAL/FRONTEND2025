import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Turno } from '../../../interface/turno';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TurnosService } from '../../../service/turnos.service';
import { CalendarioService } from '../../../service/calendario.service';
import { CalendarioDTO } from '../../../interface/CalendarioDTO/calendariodto';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit {

  diasSemana: string[] = [];
  horarios: string[] = [];
  turnos: Turno[] = [];
  calendario!: CalendarioDTO;

  cargando: boolean = true;
  inicioSemana: moment.Moment = moment().startOf('week').add(1, 'day');

  constructor(
    private http: HttpClient,
    private turnosService: TurnosService,
    private calendarioService: CalendarioService
  ) {}

  ngOnInit(): void {
    this.calendarioService.obtenerCalendarios().subscribe({
      next: (calendarios) => {
        if (calendarios.length > 0) {
          this.calendario = calendarios[0];
          this.actualizarCalendario();
          this.generarHorarios();
          this.obtenerTurnos();
        } else {
          console.warn('No se encontró ningún calendario para el usuario');
          this.cargando = false;
        }
      },
      error: (error) => {        
        this.cargando = false;
      }
    });
  }

  actualizarCalendario(): void {
    this.diasSemana = [];
    for (let i = 0; i < 7; i++) {
      this.diasSemana.push(this.inicioSemana.clone().add(i, 'days').format('dddd DD/MM'));
    }
  }

  generarHorarios(): void {
    this.horarios = [];

    const inicio = moment(this.calendario.horaInicioTurnos, 'HH:mm:ss');
    const fin = moment(this.calendario.horaFinTurnos, 'HH:mm:ss');
    const intervalo = moment.duration(this.calendario.intervaloTurnos);

    while (inicio < fin) {
      this.horarios.push(inicio.format('HH:mm'));
      inicio.add(intervalo);
    }
  }

  obtenerTurnos(): void {
    this.turnosService.getTurnos().subscribe({
      next: (turnos) => {        
        this.turnos = Array.isArray(turnos) ? turnos : [];
        this.cargando = false;
      },
      error: (error) => {        
        this.cargando = false;
      }
    });
  }

  obtenerTurno(dia: string, hora: string): Turno | undefined {
    const fecha = moment(dia.split(' ')[1], 'DD/MM');
    const año = moment(this.calendario.fechaInicio).year();

    const fechaHora = fecha.set({
      hour: parseInt(hora.split(':')[0]),
      minute: parseInt(hora.split(':')[1]),
      second: 0,
      year: año
    });

    return this.turnos.find(t => moment(t.fechaHora).isSame(fechaHora, 'minute'));
  }

  estiloTurno(turno?: Turno): string {
    if (!turno) return 'sin-turno turno';
    return turno.estado === 'Reservado' ? 'turno turno-ocupado' : 'turno turno-disponible';
  }

  manejarClick(turno?: Turno, fecha?: string, hora?: string): void {
    if (!turno) {
      alert(`Reservar turno para el día ${fecha} a las ${hora}`);
      // Aquí va luego el MatDialog para elegir paciente, odontólogo, obra social
    } else {
      alert(`Turno de ${turno.nombrePaciente} - Estado: ${turno.estado}`);
    }
  }

  semanaAnterior(): void {
    this.inicioSemana = this.inicioSemana.clone().subtract(7, 'days');
    this.actualizarCalendario();
  }

  semanaSiguiente(): void {
    this.inicioSemana = this.inicioSemana.clone().add(7, 'days');
    this.actualizarCalendario();
  }
}
