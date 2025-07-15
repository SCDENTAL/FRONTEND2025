import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatSelectModule
} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { startWith, map } from 'rxjs/operators';

import { ObraSocial } from '../../interface/obra-social';
import { Paciente } from '../../interface/paciente';
import { odontologoDetalle } from '../../interface/odontologodetalle';
import { ReservarTurnoDTO } from '../../interface/TurnoDTO/ReservarTurnoDTO';

import { EmpleadosService } from '../../service/empleados.service';
import { PacienteService } from '../../service/paciente.service';
import { ObraSocialService } from '../../service/obra-social.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
  selector: 'app-crearturnodialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ],
  templateUrl: './crearturnodialog.component.html',
  styleUrl: './crearturnodialog.component.scss'
})
export class CrearturnodialogComponent implements OnInit {

  form: FormGroup;

  pacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  pacienteFiltroControl = new FormControl('');

  obrasSociales: ObraSocial[] = [];
  obrasSocialesFiltradas: ObraSocial[] = [];
  obraSocialFiltroControl = new FormControl('');

  odontologos: odontologoDetalle[] = [];

  constructor(
    private fb: FormBuilder,
    private pacientesService: PacienteService,
    private empleadosService: EmpleadosService,
    private obraSocialesService: ObraSocialService,
    private dialogRef: MatDialogRef<CrearturnodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fechaHora: Date, turno?: ReservarTurnoDTO }
  ) {
    this.form = this.fb.group({
      pacienteId: ['', Validators.required],
      odontologoId: ['', Validators.required],
      obraSocialId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.pacientesService.getPacientes().subscribe(res => {
      this.pacientes = res;
      this.pacientesFiltrados = res;

      this.pacienteFiltroControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filtrarPacientes(value ?? ''))
        )
        .subscribe(filtered => this.pacientesFiltrados = filtered);
    });

    this.obraSocialesService.getObrasSociales().subscribe(res => {
      this.obrasSociales = res;
      this.obrasSocialesFiltradas = res;

      this.obraSocialFiltroControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filtrarObrasSociales(value ?? ''))
        )
        .subscribe(filtered => this.obrasSocialesFiltradas = filtered);
    });

    this.empleadosService.getEmpleados().subscribe(res => this.odontologos = res);
  }

  private filtrarPacientes(valor: string): Paciente[] {
  const filtro = valor.toLowerCase();
  return this.pacientes.filter(p =>
    (`${p.nombre} ${p.apellido} ${p.dni?.toString() ?? ''}`).toLowerCase().includes(filtro)
  );
}

  private filtrarObrasSociales(valor: string): ObraSocial[] {
    const filtro = valor.toLowerCase();
    return this.obrasSociales.filter(o =>
      o.nombre.toLowerCase().includes(filtro)
    );
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

  obtenerTextoPacienteSeleccionado(): string {
  const id = this.form.get('pacienteId')?.value;
  const paciente = this.pacientes.find(p => p.id === id);
  return paciente ? `${paciente.dni} - ${paciente.nombre} ${paciente.apellido}` : '';
}


  cancelar(): void {
    this.dialogRef.close();
  }

  get obraSocialId() { return this.form.get('obraSocialId'); }
  get pacienteId() { return this.form.get('pacienteId'); }
  get odontologoId() { return this.form.get('odontologoId'); }
}
