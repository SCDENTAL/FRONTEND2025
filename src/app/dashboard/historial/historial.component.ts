// // import { Component } from '@angular/core';
// // import { TurnosService } from '../../service/turnos.service';
// // import { PacienteService } from '../../service/paciente.service';
// // import { PacienteDTO } from '../../interface/PacienteDTO/PacienteDTO';
// // import { TurnoDetalleDTO } from '../../interface/TurnoDTO/TurnoDetalleDTO';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatOptionModule } from '@angular/material/core';
// // import { MatListModule } from '@angular/material/list';
// // import { FormsModule } from '@angular/forms';
// // import { MatAutocompleteModule } from '@angular/material/autocomplete'
// // import { CommonModule } from '@angular/common';
// // import { MatTableModule } from '@angular/material/table';

// // @Component({
// //   selector: 'app-historial',
// //   standalone: true,
// //   imports: [
// //     MatFormFieldModule,
// //     MatAutocompleteModule,
// //     MatInputModule,
// //     MatOptionModule,
// //     MatListModule,
// //     FormsModule,
// //     MatTableModule,
// //     CommonModule,
// //   ],
// //   templateUrl: './historial.component.html',
// //   styleUrl: './historial.component.scss'
// // })
// // export class HistorialComponent {

// //   displayedColumns: string[] = ['fecha', 'horario', 'odontologo', 'estado'];


// //   pacientes: PacienteDTO[] = [];
// //   historial: TurnoDetalleDTO[] = [];
// //   pacienteSeleccionado: PacienteDTO | null = null;
// //   textoBusqueda = '';

// //   constructor(
// //     private pacienteService: PacienteService,
// //     private turnoService: TurnosService
// //   ) { }

// //   getEstadoTurno(turno: TurnoDetalleDTO): { texto: string; clase: string } {
// //   if (turno.asistio === true) {
// //     return { texto: 'Asistió', clase: 'asistio' };
// //   } else if (turno.asistio === false) {
// //     return { texto: 'No asistió', clase: 'no-asistio' };
// //   } else if (turno.confirmado) {
// //     return { texto: 'Confirmó', clase: 'confirmo' };
// //   } else {
// //     return { texto: 'Reservó', clase: 'reservo' };
// //   }
// // }


// //   buscar(event: any) {
// //     const value = event.target.value;
// //     if (value.length > 2) {
// //       this.pacienteService.buscarPacientes(value).subscribe(data => {
// //         this.pacientes = data;
// //       });
// //     }
// //   }

// //   mostrarPaciente = (paciente: PacienteDTO): string => {
// //     return paciente ? `${paciente.nombre} ${paciente.apellido} - DNI: ${paciente.dni} ` : '';
// //   };


// //   verHistorial(paciente: PacienteDTO) {
// //     this.pacienteSeleccionado = paciente;
// //     this.turnoService.getHistorialPaciente(paciente.id).subscribe(data => {
// //       this.historial = data;
// //     });
// //   }

// // }


// import { Component } from '@angular/core';
// import { TurnosService } from '../../service/turnos.service';
// import { PacienteService } from '../../service/paciente.service';
// import { PacienteDTO } from '../../interface/PacienteDTO/PacienteDTO';
// import { TurnoDetalleDTO } from '../../interface/TurnoDTO/TurnoDetalleDTO';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatOptionModule } from '@angular/material/core';
// import { MatListModule } from '@angular/material/list';
// import { FormsModule } from '@angular/forms';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from "@angular/material/paginator";

// @Component({
//   selector: 'app-historial',
//   standalone: true,
//   imports: [
//     MatFormFieldModule,
//     MatAutocompleteModule,
//     MatInputModule,
//     MatOptionModule,
//     MatListModule,
//     FormsModule,
//     CommonModule,
//     MatTableModule,
//     MatPaginatorModule
// ],
//   templateUrl: './historial.component.html',
//   styleUrl: './historial.component.scss'
// })
// export class HistorialComponent {

//   displayedColumns: string[] = ['fecha', 'horario', 'odontologo', 'estado'];


//   pacientes: PacienteDTO[] = [];
//   historial: TurnoDetalleDTO[] = [];
//   pacienteSeleccionado: PacienteDTO | null = null;
//   textoBusqueda = '';

//   constructor(
//     private pacienteService: PacienteService,
//     private turnoService: TurnosService
//   ) { }

//   // Determina el estado del turno según asistio/confirmado
//   getEstadoTurno(turno: TurnoDetalleDTO): { texto: string; clase: string } {
//     if (turno.asistio === true) {
//       return { texto: 'Asistió', clase: 'asistio' };
//     } else if (turno.asistio === false) {
//       return { texto: 'No asistió', clase: 'no-asistio' };
//     } else if (turno.confirmado) {
//       return { texto: 'Confirmó', clase: 'confirmo' };
//     } else {
//       return { texto: 'Reservó', clase: 'reservo' };
//     }
//   }

//   buscar(event: any) {
//     const value = event.target.value;
//     if (value.length > 2) {
//       this.pacienteService.buscarPacientes(value).subscribe(data => {
//         this.pacientes = data;
//       });
//     }
//   }

//   mostrarPaciente = (paciente: PacienteDTO): string => {
//     return paciente ? `${paciente.nombre} ${paciente.apellido} - DNI: ${paciente.dni}` : '';
//   };

//   verHistorial(paciente: PacienteDTO) {
//     this.pacienteSeleccionado = paciente;
//     this.turnoService.getHistorialPaciente(paciente.id).subscribe(data => {
//       this.historial = data;
//     });
//   }

// }

import { Component, ViewChild } from '@angular/core';
import { TurnosService } from '../../service/turnos.service';
import { PacienteService } from '../../service/paciente.service';
import { PacienteDTO } from '../../interface/PacienteDTO/PacienteDTO';
import { TurnoDetalleDTO } from '../../interface/TurnoDTO/TurnoDetalleDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { HistorialDetalleDialogComponent } from '../../dialogs/historial-detalle-dialog/historial-detalle-dialog.component';

function getPaginatorIntlEs(): MatPaginatorIntl {
  const intl = new MatPaginatorIntl();
  intl.itemsPerPageLabel = 'Items por página';
  intl.nextPageLabel = 'Siguiente';
  intl.previousPageLabel = 'Anterior';
  intl.firstPageLabel = 'Primera página';
  intl.lastPageLabel = 'Última página';
  intl.getRangeLabel = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) return `0 de ${length}`;
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} – ${endIndex} de ${length}`;
  };
  return intl;
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatOptionModule,
    MatListModule,
    FormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useFactory: getPaginatorIntlEs }
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {

  displayedColumns: string[] = ['fecha', 'horario', 'odontologo', 'estado', 'acciones'];

  pacientes: PacienteDTO[] = [];
  dataSource = new MatTableDataSource<TurnoDetalleDTO>([]);
  pacienteSeleccionado: PacienteDTO | null = null;
  textoBusqueda = '';

  @ViewChild(MatPaginator) set paginator(pg: MatPaginator) {
    if (pg) this.dataSource.paginator = pg;
  }

  constructor(
    private pacienteService: PacienteService,
    private turnoService: TurnosService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  getEstadoTurno(turno: TurnoDetalleDTO): { texto: string; clase: string } {
    if (turno.asistio === true) {
      return { texto: 'Asistió', clase: 'asistio' };
    } else if (turno.asistio === false) {
      return { texto: 'No asistió', clase: 'no-asistio' };
    } else if (turno.confirmado) {
      return { texto: 'Confirmó', clase: 'confirmo' };
    } else {
      return { texto: 'Reservó', clase: 'reservo' };
    }
  }

  buscar(event: any) {
    const value = event.target.value;
    if (value.length > 2) {
      this.pacienteService.buscarPacientes(value).subscribe(data => {
        this.pacientes = data;
      });
    }
  }

  mostrarPaciente = (paciente: PacienteDTO): string => {
    return paciente ? `${paciente.nombre} ${paciente.apellido} - DNI: ${paciente.dni}` : '';
  };

  verHistorial(paciente: PacienteDTO) {
    this.pacienteSeleccionado = paciente;
    this.turnoService.getHistorialPaciente(paciente.id).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  verDetalle(turno: TurnoDetalleDTO) {
    this.dialog.open(HistorialDetalleDialogComponent, {
      width: '450px',
      data: { turno }
    });
  }

  verEnCalendario(turno: TurnoDetalleDTO) {
    this.router.navigate(['/admin/turnos'], {
      queryParams: {
        calendarioId: turno.idCalendario,
        fecha: turno.fecha,
        horario: turno.horario
      }
    });
  }

}
