import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Turno } from '../../interface/turno';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-turnos-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './turnos-dialog.component.html',
  styleUrl: './turnos-dialog.component.scss'
})
export class TurnosDialogComponent   {


  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TurnosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Turno,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [data.id],
      nombrePaciente: [data.nombrePaciente, Validators.required],
      nombreOdontologo: [data.nombreOdontologo, Validators.required],
      fechaHoraInicio: [data.fechaHoraInicio, Validators.required],
      fechaHoraFin: [data.fechaHoraFin, Validators.required],
      estado: [data.estado, Validators.required],
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}
