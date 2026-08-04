import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TurnoDetalleDTO } from '../../interface/TurnoDTO/TurnoDetalleDTO';

@Component({
  selector: 'app-historial-detalle-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './historial-detalle-dialog.component.html',
  styleUrl: './historial-detalle-dialog.component.scss'
})
export class HistorialDetalleDialogComponent {
  turno: TurnoDetalleDTO;

  constructor(
    private dialogRef: MatDialogRef<HistorialDetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { turno: TurnoDetalleDTO }
  ) {
    this.turno = data.turno;
  }

  getEstado(): { texto: string; clase: string } {
    if (this.turno.asistio === true) {
      return { texto: 'Asistió', clase: 'asistio' };
    } else if (this.turno.asistio === false) {
      return { texto: 'No asistió', clase: 'no-asistio' };
    } else if (this.turno.confirmado) {
      return { texto: 'Confirmó', clase: 'confirmo' };
    } else {
      return { texto: 'Reservó', clase: 'reservo' };
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
