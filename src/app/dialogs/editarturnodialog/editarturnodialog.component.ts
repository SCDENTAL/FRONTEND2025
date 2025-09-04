import { Component, Inject, OnInit } from '@angular/core';
import { ObraSocial } from '../../interface/obra-social';
import { Paciente } from '../../interface/paciente';
import { odontologoDetalle } from '../../interface/odontologodetalle';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacienteService } from '../../service/paciente.service';
import { EmpleadosService } from '../../service/empleados.service';
import { ObraSocialService } from '../../service/obra-social.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';



@Component({
  selector: 'app-editarturnodialog',
  imports: [   CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule
  
  ],
  templateUrl: './editarturnodialog.component.html',
  styleUrl: './editarturnodialog.component.scss'
})
export class EditarturnodialogComponent implements OnInit {


  obrasSociales: ObraSocial[] = [];
  pacientes: Paciente[] = [];
  odontologos: odontologoDetalle[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacientesService: PacienteService,
    private empleadosService: EmpleadosService,
    private obraSociales: ObraSocialService,
    private dialogRef: MatDialogRef<EditarturnodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      pacienteId: number,
      odontologoId: number,
      obraSocialId: number,
      Asistio: boolean,
      Observaciones?: string,
    }
  ) {
    this.form = this.fb.group({
      pacienteId: [data.pacienteId, Validators.required],
      odontologoId: [data.odontologoId, Validators.required],
      obraSocialId: [data.obraSocialId, Validators.required],
      asistio: [data.Asistio ?? false],
      observaciones: [data.Observaciones ?? '']

    });
  }

  ngOnInit(): void {
    this.pacientesService.getPacientes().subscribe(res => this.pacientes = res);
    this.empleadosService.getEmpleados().subscribe(res => this.odontologos = res);
    this.obraSociales.getObrasSociales().subscribe(res => this.obrasSociales = res);
  }

  guardar(): void {
    if (this.form.valid) {
      const resultado = {
        editar: true,
        ...this.form.value
      };
      this.dialogRef.close(resultado);
    }
  }

  cancelar(): void {
  this.dialogRef.close({ cancelar: true });
}
  

  get obraSocialId() { return this.form.get('obraSocialId'); }
  get pacienteId() { return this.form.get('pacienteId'); }
  get odontologoId() { return this.form.get('odontologoId'); }
  get asistio() { return this.form.get('asistio'); }
}


