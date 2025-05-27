import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmpleadosService } from '../../service/empleados.service';
import { PacienteService } from '../../service/paciente.service';
import { ObraSocialService } from '../../service/obra-social.service';
import { Empleado } from '../../interface/empleado';
import { Paciente } from '../../interface/paciente';
import { ObraSocial } from '../../interface/obra-social';
import { CrearTurno } from '../../interface/crear-turno';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-calendario-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogActions,
    MatOptionModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './calendario-dialog.component.html',
  styleUrl: './calendario-dialog.component.scss'
})
export class CalendarioDialogComponent {
  
  odontologos: Empleado[] = [];
  pacientes: Paciente[] = [];
  obrasSociales: ObraSocial[] = [];



constructor(private odontologoService: EmpleadosService,
            private pacienteService : PacienteService,
            private obrasSocialesService: ObraSocialService
){

}


  private datosCargados = {
    odontologos: false,
    pacientes: false,
    obrasSociales: false
  };
  
  ngOnInit() {
    this.cargarOdontologos();
    this.cargarPacientes();
    this.cargarObrasSociales();
  }
  
  private cargarOdontologos() {
    this.odontologoService.getEmpleados().subscribe({
      next: data => {
        this.odontologos = data;
        this.datosCargados.odontologos = true;
        this.verificarCargaCompleta();
      }
    });
  }
  
  private cargarPacientes() {
    this.pacienteService.getPacientes().subscribe({
      next: data => {
        this.pacientes = data;
        this.datosCargados.pacientes = true;
        this.verificarCargaCompleta();
      }
    });
  }
  
  private cargarObrasSociales() {
    this.obrasSocialesService.getObrasSociales().subscribe({
      next: data => {
        this.obrasSociales = data;
        this.datosCargados.obrasSociales = true;
        this.verificarCargaCompleta();
      }
    });
  }
  
  private verificarCargaCompleta() {
    if (this.datosCargados.odontologos && this.datosCargados.pacientes && this.datosCargados.obrasSociales) {
      this.inicializarFormulario();
    }
  }

  
  inicializarFormulario() {
    throw new Error('Method not implemented.');
  }

}
