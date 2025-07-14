import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ObraSocial } from '../../interface/obra-social';
import { ObraSocialService } from '../../service/obra-social.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ObraSocialDialogComponent } from '../../dialogs/obra-social-dialog/obra-social-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-obras-sociales',
  standalone: true,
  templateUrl: './obras-sociales.component.html',
  styleUrls: ['./obras-sociales.component.scss'],
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
export class ObrasSocialesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'opciones'];
  dataSource: MatTableDataSource<ObraSocial> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private obraSocialService: ObraSocialService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarObrasSociales();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cargarObrasSociales() {
    this.obraSocialService.getObrasSociales().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error al cargar obras sociales', error);
      },
    });
  }

  aplicarFiltro(event: Event) {
    const input = event.target as HTMLInputElement;
    const valor = input.value.trim().toLowerCase();
    this.dataSource.filter = valor;
  }

  agregarObraSocial() {
    const dialogRef = this.dialog.open(ObraSocialDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obraSocialService.crearObraSocial(result).subscribe({
          next: () => {
            this.cargarObrasSociales();
            Swal.fire('Éxito', 'Se ha agregado una obra social con éxito', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo agregar la obra social', 'error');
          },
        });
      }
    });
  }

  editarObra(obra: ObraSocial) {
    const dialogRef = this.dialog.open(ObraSocialDialogComponent, {
      data: { obraSocial: obra },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obraSocialService.actualizarObraSocial(obra.id, result).subscribe({
          next: () => {
            this.cargarObrasSociales();
            Swal.fire('Éxito', 'La obra social ha sido actualizada', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo actualizar la obra social', 'error');
          },
        });
      }
    });
  }

  borrarObra(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar esta obra social?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.obraSocialService.eliminarObraSocial(id).subscribe({
          next: () => {
            this.cargarObrasSociales();
            Swal.fire('Eliminado!', 'La obra social ha sido eliminada.', 'success');
          },
          error: () => {
            Swal.fire('Error!', 'No se pudo eliminar la obra social.', 'error');
          },
        });
      }
    });
  }
}
