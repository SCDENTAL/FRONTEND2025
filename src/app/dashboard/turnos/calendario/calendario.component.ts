import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
import { Turno } from '../../../interface/turno';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TurnosService } from '../../../service/turnos.service';



@Component({
  selector: 'app-calendario',
  imports: [CommonModule,    
    MatProgressSpinnerModule
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit {
  diasSemana: string[] = [];
  horarios: string[] = [];
  turnos: Turno[] = [];
  isDataLoaded: boolean = false;
  cargando: boolean = true;


  inicioSemana: moment.Moment = moment().startOf('week').add(1, 'day');

  constructor(private http: HttpClient,
              private turnosService : TurnosService
  ) { }

  ngOnInit(): void {
  this.actualizarCalendario();
  this.generarHorarios();

  this.turnosService.getTurnos().subscribe({
    next: (turnos) => {
      this.turnos = turnos;
      this.cargando = false;
    },
    error: (error) => {
      console.error('Error al obtener turnos:', error);
      this.cargando = false;
    }
  });
}

  generarDiasSemana(): void {
    for (let i = 0; i < 7; i++) {
      this.diasSemana.push(this.inicioSemana.clone().add(i, 'day').format('dddd DD/MM'));
    }
  }

  cargarTurnos(): void {
  this.http.get<Turno[]>('https://localhost:7292/api/Turno').subscribe(data => {
    this.turnos = data;
    this.isDataLoaded = true; 
  })
}
  

  generarHorarios(): void {
    const inicio = moment('08:00', 'HH:mm');
    const fin = moment('18:00', 'HH:mm');
    while (inicio <= fin) {
      this.horarios.push(inicio.format('HH:mm'));
      inicio.add(30, 'minutes');
    }
  }

  

  obtenerTurno(dia: string, hora: string): Turno | undefined {
  const fecha = moment(dia.split(' ')[1], 'DD/MM');
  const añoActual = moment().year();

  const fechaHora = fecha.set({
    hour: parseInt(hora.split(':')[0]),
    minute: parseInt(hora.split(':')[1]),
    second: 0,
    year: añoActual
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

actualizarCalendario(): void {
  this.diasSemana = [];
  this.generarDiasSemana();
}

  

}
