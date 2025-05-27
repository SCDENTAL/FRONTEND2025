import { Component } from '@angular/core';
import { TurnosService } from '../../service/turnos.service';
import { Turno } from '../../interface/turno';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TurnosDialogComponent } from '../../dialogs/turnos-dialog/turnos-dialog.component';
import Swal from 'sweetalert2';
import { CalendarioDialogComponent } from '../../dialogs/calendario-dialog/calendario-dialog.component';
import { EmpleadosService } from '../../service/empleados.service';
import { PacienteService } from '../../service/paciente.service';
import { ObraSocialService } from '../../service/obra-social.service';
import { Empleado } from '../../interface/empleado';
import { Paciente } from '../../interface/paciente';
import { ObraSocial } from '../../interface/obra-social';

@Component({
  selector: 'app-turnos',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent {
  turnos: Turno[] = [];
  odontologos: Empleado[] = [];
  pacientes: Paciente[] = [];
  obrasSociales: ObraSocial[] = [];
  displayedColumns: string[] = ['nombrePaciente', 'nombreOdontologo', 'fechaHoraInicio', 'estado', 'acciones'];

  constructor(
    private turnosService: TurnosService,
    private dialog: MatDialog,
    private empleadosService: EmpleadosService,
    private pacienteService: PacienteService,
    private obraSocialService: ObraSocialService
  ) {}

  ngOnInit(): void {

    this.empleadosService.getEmpleados().subscribe(data => this.odontologos = data);
    this.pacienteService.getPacientes().subscribe(data => this.pacientes = data);
    this.obraSocialService.getObrasSociales().subscribe(data => this.obrasSociales = data);
    this.obtenerTurnos();

  }

  obtenerTurnos(): void {
    this.turnosService.getTurnos().subscribe({
      next: (data) => this.turnos = data,
      error: (err) => console.error('Error al obtener turnos', err)
    });
  }

  agregarTurno(): void {
    const dialogRef = this.dialog.open(CalendarioDialogComponent, {
    
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.turnosService.crearTurno(result).subscribe({
          next: () => this.obtenerTurnos(),
          error: err => console.error('Error al crear turno', err)
        });
      }
    });
  }
  

  eliminarTurno(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el turno definitivamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.turnosService.eliminarTurno(id).subscribe({
          next: () => {
            this.obtenerTurnos();
            Swal.fire('Eliminado', 'El turno ha sido eliminado.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar turno', err);
            Swal.fire('Error', 'No se pudo eliminar el turno.', 'error');
          }
        });
      }
    });
  }

  editarTurno(turno: Turno): void {
    const dialogRef = this.dialog.open(TurnosDialogComponent, {
      width: '400px',
      data: { ...turno }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.turnosService.actualizarTurno(turno.id, result).subscribe({
          next: () => this.obtenerTurnos(),
          error: err => console.error('Error al editar turno', err)
        });
      }
    });
  }
}