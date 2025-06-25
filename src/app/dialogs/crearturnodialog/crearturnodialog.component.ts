import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ObraSocial } from '../../interface/obra-social';
import { Paciente } from '../../interface/paciente';
import { Odontologos } from '../../interface/odontologos';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-crearturnodialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './crearturnodialog.component.html',
  styleUrl: './crearturnodialog.component.scss'
})
export class CrearturnodialogComponent {


  obrasSociales: ObraSocial[] = [];
  pacientes: Paciente[]= [];
  odontologos: Odontologos[] = []

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearturnodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fechaHora: Date }
  ) {
    this.form = this.fb.group({
      nombrePaciente: ['', Validators.required],
      nombreOdontologo: ['', Validators.required],
      obraSocialId: ['', Validators.required],
      
    });
  }

  guardar(): void {
    if (this.form.valid) {
      const resultado = {
        ...this.form.value,
        fechaHora: this.data.fechaHora
      };
      this.dialogRef.close(resultado);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }


   get obraSocialId() { return this.form.get('obraSocialId'); }

}
