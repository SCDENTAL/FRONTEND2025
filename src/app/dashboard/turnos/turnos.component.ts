import { Component, OnInit } from '@angular/core';


import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { CalendarioComponent } from "./calendario/calendario.component";
import { MatIconModule } from '@angular/material/icon';
import { CalendarioDialogComponent } from '../../dialogs/calendario-dialog/calendario-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CalendarioService } from '../../service/calendario.service';
import { CrearCalendarioDTO } from '../../interface/CalendarioDTO/crearcalendariodto';
import Swal from 'sweetalert2';
import { CalendarioDTO } from '../../interface/CalendarioDTO/calendariodto';
import { TurnosService } from '../../service/turnos.service';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    CalendarioComponent,
    MatIconModule,
  ],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent implements OnInit {

  calendario!: CalendarioDTO;
  turnos: any[] = []; 
  cargando: boolean = true;

  calendarios: CalendarioDTO[] = [];


  constructor(private dialog: MatDialog,
    private http: HttpClient,
    private calendarioService: CalendarioService,
    private turnoServioce: TurnosService
  ) {


  }

  ngOnInit() {
    this.calendarioService.obtenerCalendarios().subscribe({
      next: (calendarios) => {
        this.calendarios = calendarios;

        if (calendarios.length > 0) {
          this.calendario = calendarios[0];
          this.cargarCalendario();
        }
      },
      error: (err) => {        
      }
    });
  }


  cargarCalendario(): void {
    this.turnoServioce.getTurnos().subscribe({
      next: (turnos) => {
        this.turnos = turnos;
        this.cargando = false;
      },
      error: (error) => {        
        this.cargando = false;
      }
    });
  }



  abrirDialogoCrearCalendario(): void {
  const dialogRef = this.dialog.open(CalendarioDialogComponent);

  dialogRef.afterClosed().subscribe((nuevoCalendario: CalendarioDTO) => {
    if (nuevoCalendario) {      
      this.calendario = nuevoCalendario;
      this.cargarCalendario(); 
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
            this.calendario = undefined!;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el calendario.', 'error');
          }
        });
      }
    });
  }








}