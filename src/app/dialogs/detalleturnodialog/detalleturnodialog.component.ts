import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Turno } from '../../interface/turno';
import { Paciente } from '../../interface/paciente';
import { ObraSocial } from '../../interface/obra-social';
import { Empleado } from '../../interface/empleado';
import { PacienteService } from '../../service/paciente.service';
import { EmpleadosService } from '../../service/empleados.service';
import { ObraSocialService } from '../../service/obra-social.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalleturnodialog',
  standalone: true,
  templateUrl: './detalleturnodialog.component.html',
  styleUrl: './detalleturnodialog.component.scss',
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class DetalleturnodialogComponent implements OnInit {
  turno!: Turno;
  paciente?: Paciente;
  odontologo?: Empleado;
  obraSocial?: ObraSocial;

  constructor(
    private dialogRef: MatDialogRef<DetalleturnodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { turno: Turno },
    private pacienteService: PacienteService,
    private empleadosService: EmpleadosService,
    private obraSocialService: ObraSocialService
  ) {
    this.turno = data.turno;
  }

  ngOnInit(): void {
    if (this.turno.idPaciente) {
      this.pacienteService.getPacientes().subscribe(res =>
        this.paciente = res.find(p => p.id === this.turno.idPaciente)
      );
    }

    if (this.turno.odontologoId) {
      this.empleadosService.getEmpleados().subscribe(res =>
        this.odontologo = res.find(o => o.id === this.turno.odontologoId)
      );
    }

    if (this.turno.obraSocialId) {
      this.obraSocialService.getObrasSociales().subscribe(res =>
        this.obraSocial = res.find(o => o.id === this.turno.obraSocialId)
      );
    }
  }

  editar(): void {
    this.dialogRef.close({ editar: true });
  }

  cancelar(): void {
    this.dialogRef.close({ cancelar: true });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
