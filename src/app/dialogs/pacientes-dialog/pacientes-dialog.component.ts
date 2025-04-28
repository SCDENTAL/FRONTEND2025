import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ObraSocialService } from '../../service/obra-social.service';
import { PacienteService } from '../../service/paciente.service';
import { ObraSocial } from '../../interface/obra-social';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-pacientes-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './pacientes-dialog.component.html',
  styleUrl: './pacientes-dialog.component.scss'
})
export class PacientesDialogComponent {
  form: FormGroup;
  obrasSociales: ObraSocial[] = [];



  constructor(

    private fb: FormBuilder,
    private obraSocialService: ObraSocialService,
    private pacienteService: PacienteService,


    private dialogRef: MatDialogRef<PacientesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    {
      this.form = this.fb.group({
        nombre: [data?.paciente?.nombre || '', Validators.required],
        apellido: [data?.paciente?.apellido || '', Validators.required],
        dni: [data?.paciente?.dni || '', [Validators.required,]],
        telefono: [data?.paciente?.telefono || '', [Validators.required]],
        email: [data?.paciente?.email || '', [Validators.required]],
        obraSocialId: ['', Validators.required], 
      });

      this.cargarObrasSociales();
    }
  }

  cargarObrasSociales() {
    this.obraSocialService.getObrasSociales().subscribe((obras) => {
      this.obrasSociales = obras;
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }
  get apellido() {
    return this.form.get('apellido');
  }
  get dni() {
    return this.form.get('dni');
  }
  get telefono() {
    return this.form.get('telefono');
  }
  get email() {
    return this.form.get('email');
  }
  get obraSocialId() 
  { return this.form.get('obraSocialId'); }


  onSave() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const paciente = {
        ...formValue,
        dni: parseInt(formValue.dni),
        telefono: parseInt(formValue.telefono),
        obraSocialId: parseInt(formValue.obraSocialId)
      };
      console.log('Paciente que se envía:', paciente); 
      this.dialogRef.close(paciente);
    }
  }
  
  onCancel() {
    this.dialogRef.close();
  }

}
