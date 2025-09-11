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
import { MatCheckboxModule } from '@angular/material/checkbox';
import Swal from 'sweetalert2';
import { TurnosService } from '../../service/turnos.service';

@Component({
  selector: 'app-detalleturnodialog',
  standalone: true,
  templateUrl: './detalleturnodialog.component.html',
  styleUrl: './detalleturnodialog.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule
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
    private obraSocialService: ObraSocialService,
    private turnosService: TurnosService
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

  marcarConfirmacion(confirmado: boolean) {
  console.log("Confirmación cambiada:", confirmado); // 👈 debug
  
  this.turnosService.marcarConfirmacion(this.turno.id, { confirmado }).subscribe(() => {
    this.turno.confirmado = confirmado; // actualizar en memoria
    Swal.fire({
      title: confirmado ? 'Turno confirmado' : 'Confirmación quitada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1200
    });
  }, () => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo actualizar la confirmación.',
      confirmButtonColor: '#d33'
    });
  });
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
