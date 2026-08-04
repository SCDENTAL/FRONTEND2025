import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-extender-calendario-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  templateUrl: './extender-calendario-dialog.component.html',
  styleUrl: './extender-calendario-dialog.component.scss',
})
export class ExtenderCalendarioDialogComponent {
  fechaSeleccionada: Date | null = null;
  excluirDomingo = true;
  fechaMinima: Date;
  fechaFinActual: string;

  constructor(
    private dialogRef: MatDialogRef<ExtenderCalendarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fechaFin: string }
  ) {
    this.fechaFinActual = data.fechaFin;
    this.fechaMinima = new Date(data.fechaFin);
    this.fechaMinima.setDate(this.fechaMinima.getDate() + 1);
  }

  filtroFechas = (d: Date | null): boolean => {
    if (!d) return false;
    return d > new Date(this.data.fechaFin);
  };

  confirmar(): void {
    if (!this.fechaSeleccionada) return;
    this.dialogRef.close({
      fechaFin: this.fechaSeleccionada.toISOString(),
      excluirDomingo: this.excluirDomingo,
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
