import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { CalendarioComponent } from "./calendario/calendario.component";
import { CalendarioDialogComponent } from '../../dialogs/calendario-dialog/calendario-dialog.component';
import { ExtenderCalendarioDialogComponent } from '../../dialogs/extender-calendario-dialog/extender-calendario-dialog.component';
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
    MatMenuModule,
    MatFormFieldModule,
    CalendarioComponent
  ],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent implements OnInit {

  calendario!: CalendarioDTO;
  calendarios: CalendarioDTO[] = [];
  cargando: boolean = true;
  highlightFecha: string | null = null;
  highlightHorario: string | null = null;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private calendarioService: CalendarioService,
    private turnoService: TurnosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCalendarios();
  }

  cargarCalendarios(): void {
    this.calendarioService.obtenerCalendarios().subscribe({
      next: (calendarios) => {
        this.calendarios = calendarios;

        const params = this.route.snapshot.queryParams;
        const calIdRaw = params['calendarioId'];
        const calId = calIdRaw ? +calIdRaw : null;
        const tieneFecha = !!params['fecha'];

        if (calId && calId > 0) {
          const found = calendarios.find(c => c.id === calId);
          this.calendario = found || (calendarios.length > 0 ? calendarios[0] : undefined!);
        } else {
          this.calendario = calendarios.length > 0 ? calendarios[0] : undefined!;
        }

        if (tieneFecha) {
          this.highlightFecha = params['fecha'].split('T')[0];
          this.highlightHorario = params['horario'] || null;
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

  extenderCalendario(): void {
    if (!this.calendario?.id) return;

    const fechaActual = this.calendario.fechaFin
      ? new Date(this.calendario.fechaFin).toISOString().split('T')[0]
      : '';

    const dialogRef = this.dialog.open(ExtenderCalendarioDialogComponent, {
      data: { fechaFin: fechaActual },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result: { fechaFin: string; excluirDomingo: boolean } | undefined) => {
      if (!result) return;
      this.calendarioService.extenderCalendario(this.calendario.id, result).subscribe({
        next: () => {
          Swal.fire('Extendido', 'Calendario extendido con éxito.', 'success');
          this.cargarCalendarios();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo extender el calendario.', 'error');
        },
      });
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
