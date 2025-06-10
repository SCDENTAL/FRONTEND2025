import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../interface/paciente';
import { PacienteService } from '../../service/paciente.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PacientesDialogComponent } from '../../dialogs/pacientes-dialog/pacientes-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ]
})
export class PacientesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'telefono', 'email','obraSocial', 'opciones'];
  
  pacientes: Paciente[] = [];

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (error) => {
        console.error('Error al cargar pacientes', error);
      }
    });
  }

  editarPaciente(paciente: Paciente) {
    const dialogRef = this.dialog.open(PacientesDialogComponent, {
      data: { paciente }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPacientes(); 
      }
    });
  }
  
  agregarPaciente() {
    const dialogRef = this.dialog.open(PacientesDialogComponent, {});
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPacientes(); 
      }
    });
  }
  
  

  borrarPaciente(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este paciente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.eliminarPaciente(id).subscribe({
          next: () => {
            this.cargarPacientes();
            Swal.fire('Eliminado!', 'El paciente ha sido eliminado.', 'success');
          },
          error: () => {
            Swal.fire('Error!', 'No se pudo eliminar el paciente.', 'error');
          }
        });
      }
    });
  }
}
