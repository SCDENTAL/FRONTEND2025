import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Paciente } from '../../interface/paciente';
import { PacienteService } from '../../service/paciente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PacientesDialogComponent } from '../../dialogs/pacientes-dialog/pacientes-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class PacientesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'telefono', 'obraSocial', 'opciones'];
  dataSource: MatTableDataSource<Paciente> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cargarPacientes() {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error al cargar pacientes', error);
      }
    });
  }

  aplicarFiltro(event: Event) {
    const input = event.target as HTMLInputElement;
    const valor = input.value.trim().toLowerCase();
    this.dataSource.filter = valor;
  }

  agregarPaciente() {
    const dialogRef = this.dialog.open(PacientesDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarPacientes();
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
