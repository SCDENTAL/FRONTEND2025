import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EmpleadosService } from '../../service/empleados.service';
import { Empleado } from '../../interface/empleado';
import { EmpleadosDialogComponent } from '../../dialogs/empleados-dialog/empleados-dialog.component';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [EmpleadosService],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'email', 'opciones'];
  dataSource: MatTableDataSource<Empleado> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private empleadoService: EmpleadosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.rellenarTablaEmpleados();
    } else {
      console.warn('Token no disponible aún, no se realiza el request');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: Empleado, filter: string) => {
      const nombre = data.nombre?.toLowerCase() || '';
      const email = data.email?.toLowerCase() || '';
      return nombre.includes(filter) || email.includes(filter);
    };
  }

  aplicarFiltro(event: Event) {
    const valor = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = valor;
  }

  rellenarTablaEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error al cargar los odontólogos', error);
      }
    });
  }

  editarEmpleado(empleado: Empleado) {
    const dialogRef = this.dialog.open(EmpleadosDialogComponent, {
      data: { empleado }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rellenarTablaEmpleados();
      }
    });
  }

  agregarEmpleado() {
    const dialogRef = this.dialog.open(EmpleadosDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rellenarTablaEmpleados();
      }
    });
  }

  eliminarEmpleado(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar al odontólogo?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.empleadoService.eliminarEmpleado(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Odontólogo eliminado con éxito', 'success');
            this.rellenarTablaEmpleados();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el empleado', 'error');
          }
        });
      }
    });
  }
}
