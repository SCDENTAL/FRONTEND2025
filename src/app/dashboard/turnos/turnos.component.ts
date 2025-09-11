import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

import { CalendarioComponent } from "./calendario/calendario.component";
import { CalendarioDialogComponent } from '../../dialogs/calendario-dialog/calendario-dialog.component';
import { CalendarioService } from '../../service/calendario.service';
import { TurnosService } from '../../service/turnos.service';
import { CalendarioDTO } from '../../interface/CalendarioDTO/calendariodto';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    CalendarioComponent
  ],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent implements OnInit {

  calendario!: CalendarioDTO;
  calendarios: CalendarioDTO[] = [];
  cargando: boolean = true;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private calendarioService: CalendarioService,
    private turnoService: TurnosService
  ) {}

  ngOnInit() {
    this.cargarCalendarios();
  }

  cargarCalendarios(): void {
    this.calendarioService.obtenerCalendarios().subscribe({
      next: (calendarios) => {
        this.calendarios = calendarios;
        if (calendarios.length > 0) {
          this.calendario = calendarios[0];
        } else {
          this.calendario = undefined!;
        }
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  seleccionarCalendario(cal: CalendarioDTO): void {
    this.calendario = cal;
  }

  abrirDialogoCrearCalendario(): void {
    const dialogRef = this.dialog.open(CalendarioDialogComponent);

    dialogRef.afterClosed().subscribe((nuevoCalendario: CalendarioDTO) => {
      if (nuevoCalendario) {      
        this.calendarios.push(nuevoCalendario);
        this.calendario = nuevoCalendario;
      }
    });
  }

  eliminarCalendario(): void {
    if (!this.calendario?.id) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el calendario y sus turnos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.calendarioService.eliminarCalendario(this.calendario.id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Calendario eliminado con éxito.', 'success');            
            this.calendarios = this.calendarios.filter(c => c.id !== this.calendario.id);
            this.calendario = this.calendarios.length > 0 ? this.calendarios[0] : undefined!;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el calendario.', 'error');
          }
        });
      }
    });
  }
}
