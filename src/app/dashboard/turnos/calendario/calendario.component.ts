import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import 'moment/locale/es';
import { Turno } from '../../../interface/turno';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TurnosService } from '../../../service/turnos.service';
import { CalendarioService } from '../../../service/calendario.service';
import { CalendarioDTO } from '../../../interface/CalendarioDTO/calendariodto';
import { MatDialog } from '@angular/material/dialog';
import { CrearturnodialogComponent } from '../../../dialogs/crearturnodialog/crearturnodialog.component';
import { ReservarTurnoDTO } from '../../../interface/TurnoDTO/ReservarTurnoDTO';
import Swal from 'sweetalert2';
import { EditarturnodialogComponent } from '../../../dialogs/editarturnodialog/editarturnodialog.component';
import { EditarTurnoDTO } from '../../../interface/TurnoDTO/EditarTurnoDTO';
import { DetalleturnodialogComponent } from '../../../dialogs/detalleturnodialog/detalleturnodialog.component';
import { Paciente } from '../../../interface/paciente';
import { odontologoDetalle } from '../../../interface/odontologodetalle';
import { ObraSocial } from '../../../interface/obra-social';
import { PacienteService } from '../../../service/paciente.service';
import { EmpleadosService } from '../../../service/empleados.service';
import { ObraSocialService } from '../../../service/obra-social.service';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { TurnoOdontologo } from '../../../interface/turno-odontologo';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit {

  diasSemana: string[] = [];
  horarios: string[] = [];
  turnos: Turno[] = [];
  turnosMap: { [key: string]: Turno } = {};
  calendario!: CalendarioDTO;

  hayTurnosSemanaAnterior: boolean = true;
  hayTurnosSemanaSiguiente: boolean = true;

  pacientes: Paciente[] = [];
  odontologos: odontologoDetalle[] = [];
  obrasSociales: ObraSocial[] = [];

  cargando: boolean = true;

  inicioSemana: moment.Moment = moment().isoWeekday(1);

  constructor(
    private http: HttpClient,
    private turnosService: TurnosService,
    private calendarioService: CalendarioService,
    private dialog: MatDialog,
    private pacientesService: PacienteService,
    private empleadosService: EmpleadosService,
    private obraSocialService: ObraSocialService
  ) {
    moment.locale('es');
    moment.updateLocale('es', { week: { dow: 1 } });
  }

  ngOnInit(): void {
    this.calendarioService.obtenerCalendarios().subscribe({
      next: (calendarios) => {
        if (calendarios.length > 0) {
          this.calendario = calendarios[0];
          this.actualizarCalendario();
          this.generarHorarios();
          this.obtenerTurnos();
          this.verificarSemanasVecinas();
        } else {
          this.cargando = false;
        }
      },
      error: () => this.cargando = false
    });

    this.pacientesService.getPacientes().subscribe(res => this.pacientes = res);
    this.empleadosService.getEmpleados().subscribe(res => this.odontologos = res);
    this.obraSocialService.getObrasSociales().subscribe(res => this.obrasSociales = res);
  }

  actualizarCalendario(): void {
    this.diasSemana = [];
    for (let i = 0; i < 7; i++) {
      const dia = this.inicioSemana.clone().add(i, 'days').format('dddd DD/MM');
      this.diasSemana.push(dia.charAt(0).toUpperCase() + dia.slice(1)); // Capitaliza
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
    const fechaInicioSemana = this.inicioSemana.clone().startOf('day').toISOString();
    const fechaFinSemana = this.inicioSemana.clone().add(6, 'days').endOf('day').toISOString();

    this.cargando = true;
    this.turnosService.getTurnosPorSemana(this.calendario.id, fechaInicioSemana, fechaFinSemana).subscribe({
      next: (turnos) => {
        this.turnos = turnos || [];
        this.actualizarTurnosMap();
        this.cargando = false;
        this.verificarSemanasVecinas();
      },
      error: (error) => {
        console.error('Error al cargar turnos de la semana:', error);
        this.cargando = false;
      }
    });
  }

  actualizarTurnosMap(): void {
    this.turnosMap = {};
    this.turnos.forEach(turno => {
      const fechaStr = moment(turno.fecha).format('DD/MM');
      const horaStr = moment(turno.horario, 'HH:mm:ss').format('HH:mm');
      const key = `${fechaStr}_${horaStr}`;
      this.turnosMap[key] = turno;
    });
  }

  getTurnoMap(dia: string, hora: string): Turno | undefined {
    const fechaStr = dia.split(' ')[1];
    const key = `${fechaStr}_${hora}`;
    return this.turnosMap[key];
  }

  estiloTurno(turno?: Turno): string {
    if (!turno) return 'sin-turno turno';
    if (turno.asistio) return 'turno turno-asistido';
    return turno.disponible ? 'turno turno-disponible' : 'turno turno-ocupado';
  }

  manejarClick(turno?: Turno, fecha?: string, hora?: string): void {
    if (!turno) return;

    if (!turno.disponible) {
      const dialogRef = this.dialog.open(DetalleturnodialogComponent, { data: { turno } });
      dialogRef.afterClosed().subscribe(result => {
        if (result?.editar) this.abrirDialogoEditarTurno(turno);
        else if (result?.cancelar) this.cancelarTurno(turno);
      });
      return;
    }

    const fechaSeleccionada = moment(fecha!.split(' ')[1], 'DD/MM')
      .set({
        hour: parseInt(hora!.split(':')[0]),
        minute: parseInt(hora!.split(':')[1]),
        second: 0,
        year: moment(this.calendario.fechaInicio).year()
      }).toDate();

    const dialogRef = this.dialog.open(CrearturnodialogComponent, {
      data: { fechaHora: fechaSeleccionada }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const datos: ReservarTurnoDTO = {
          IdPaciente: result.pacienteId,
          IdOdontologo: result.odontologoId,
          IdObraSocial: result.obraSocialId
        };

        const turnoSeleccionado = this.turnos.find(t =>
          moment(t.fecha).isSame(moment(result.fechaHora), 'day') &&
          moment(t.horario, 'HH:mm:ss').format('HH:mm') === moment(result.fechaHora).format('HH:mm')
        );

        if (!turnoSeleccionado) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró el turno en la base de datos.',
            confirmButtonColor: '#d33'
          });
          return;
        }

        this.turnosService.reservarTurno(turnoSeleccionado.id, datos).subscribe(() => {
          this.obtenerTurnos();
          Swal.fire({
            title: 'Turno reservado',
            icon: 'success',
            showConfirmButton: false
          });
        }, () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo reservar el turno.',
            confirmButtonColor: '#d33'
          });
        });
      }
    });
  }

  abrirDialogoEditarTurno(turno: Turno): void {
    const dialogRef = this.dialog.open(EditarturnodialogComponent, {
      data: {
        pacienteId: turno.idPaciente!,
        odontologoId: turno.odontologoId!,
        obraSocialId: turno.obraSocialId!,
        Asistio: turno.asistio ?? false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.editar) {
        const datosEditar: EditarTurnoDTO = {
          IdPaciente: result.pacienteId,
          IdOdontologo: result.odontologoId,
          IdObraSocial: result.obraSocialId
        };

        this.turnosService.editarTurno(turno.id, datosEditar).subscribe({
          next: () => {

            if (turno.asistio !== result.asistio) {
              this.turnosService.marcarAsistencia(turno.id, { asistio: result.asistio }).subscribe({
                next: () => {
                  turno.asistio = result.asistio;
                  this.obtenerTurnos();
                  Swal.fire({ icon: 'success', title: 'Asistencia actualizada correctamente' });
                },
                error: () => {
                  Swal.fire('Error', 'No se pudo actualizar la asistencia', 'error');
                }
              });
            } else {
              this.obtenerTurnos();
              Swal.fire({ icon: 'success', title: 'Turno editado correctamente' });
            }
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo editar el turno', 'error');
          }
        });
      } else if (result?.cancelar) {
        this.cancelarTurno(turno);
      }
    });
  }



  cancelarTurno(turno: Turno): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción cancelará el turno.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.turnosService.cancelarTurno(turno.id).subscribe({
          next: () => {
            this.obtenerTurnos();
            Swal.fire({ icon: 'success', title: 'Turno cancelado correctamente' });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo cancelar el turno.'
            });
          }
        });
      }
    });
  }

  marcar(turno: Turno) {
    const asistencia = {
      asistio: !turno.asistio
    };

    this.turnosService.marcarAsistencia(turno.id, asistencia).subscribe({
      next: () => {
        turno.asistio = asistencia.asistio;
      },
      error: (err) => {
        console.error('Error al actualizar asistencia:', err);
        turno.asistio = !asistencia.asistio;
      }
    });
  }


  semanaAnterior(): void {
    this.inicioSemana = this.inicioSemana.clone().subtract(7, 'days');
    this.actualizarCalendario();
    this.obtenerTurnos();
  }

  semanaSiguiente(): void {
    this.inicioSemana = this.inicioSemana.clone().add(7, 'days');
    this.actualizarCalendario();
    this.obtenerTurnos();
  }

  verificarSemanasVecinas(): void {
    const anteriorInicio = this.inicioSemana.clone().subtract(7, 'days').startOf('day').toISOString();
    const anteriorFin = this.inicioSemana.clone().subtract(1, 'days').endOf('day').toISOString();

    const siguienteInicio = this.inicioSemana.clone().add(7, 'days').startOf('day').toISOString();
    const siguienteFin = this.inicioSemana.clone().add(13, 'days').endOf('day').toISOString();

    this.turnosService.getTurnosPorSemana(this.calendario.id, anteriorInicio, anteriorFin).subscribe({
      next: turnos => this.hayTurnosSemanaAnterior = turnos && turnos.length > 0,
      error: () => this.hayTurnosSemanaAnterior = false
    });

    this.turnosService.getTurnosPorSemana(this.calendario.id, siguienteInicio, siguienteFin).subscribe({
      next: turnos => this.hayTurnosSemanaSiguiente = turnos && turnos.length > 0,
      error: () => this.hayTurnosSemanaSiguiente = false
    });
  }

  trackByDia(index: number, item: string): string {
    return item;
  }

  trackByHora(index: number, item: string): string {
    return item;
  }
}
