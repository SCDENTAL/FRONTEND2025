import { Component, OnInit } from '@angular/core';
import { ObraSocial } from '../../interface/obra-social';
import { ObraSocialService } from '../../service/obra-social.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ObraSocialDialogComponent } from '../../dialogs/obra-social-dialog/obra-social-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-obras-sociales',
  standalone: true,
  templateUrl: './obras-sociales.component.html',
  styleUrls: ['./obras-sociales.component.scss'],
  imports: [CommonModule, MatButtonModule, MatTableModule, MatIconModule],
})
export class ObrasSocialesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'opciones'];

  obrasSociales: ObraSocial[] = [];

  constructor(
    private obraSocialService: ObraSocialService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarObrasSociales();
  }

  cargarObrasSociales() {
    this.obraSocialService.getObrasSociales().subscribe({
      next: (data) => {
        this.obrasSociales = data;
      },
      error: (error) => {
        console.error('Error al cargar obras sociales', error);
      },
    });
  }

  agregarObraSocial() {
    const dialogRef = this.dialog.open(ObraSocialDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obraSocialService.crearObraSocial(result).subscribe({
          next: () => {
            this.cargarObrasSociales();
            Swal.fire(
              'Éxito',
              'Se ha agregado una obra social con éxito',
              'success'
            );
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
            Swal.fire(
              'Eliminado!',
              'La obra social ha sido eliminada.',
              'success'
            );
          },
          error: () => {
            Swal.fire('Error!', 'No se pudo eliminar la obra social.', 'error');
          },
        });
      }
    });
  }
}
