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

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TurnosService } from '../../service/turnos.service';
import { PacienteService } from '../../service/paciente.service';
import { PacienteDTO } from '../../interface/PacienteDTO/PacienteDTO';
import { TurnoDetalleDTO } from '../../interface/TurnoDTO/TurnoDetalleDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
    MatPaginatorModule
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent implements AfterViewInit {

  displayedColumns: string[] = ['fecha', 'horario', 'odontologo', 'estado'];

  pacientes: PacienteDTO[] = [];
  dataSource = new MatTableDataSource<TurnoDetalleDTO>([]);  // 🔹 en vez de array plano
  pacienteSeleccionado: PacienteDTO | null = null;
  textoBusqueda = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pacienteService: PacienteService,
    private turnoService: TurnosService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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
    this.dataSource = new MatTableDataSource<TurnoDetalleDTO>(data);
    this.dataSource.paginator = this.paginator;
  });
}

}
