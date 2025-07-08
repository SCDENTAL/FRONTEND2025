import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../service/turnos.service';
import { TurnoOdontologo } from '../interface/turno-odontologo';
import { MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-odontologos',
  imports: [CommonModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './odontologos.component.html',
  styleUrl: './odontologos.component.scss'
})
export class OdontologosComponent implements OnInit {

  turnos: TurnoOdontologo[] = [];
  displayedColumns: string[] = ['hora', 'paciente', 'telefono', 'obraSocial', 'asistio'];


  constructor(private turnoService: TurnosService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.turnoService.getTurnosDelDiaOdontologo().subscribe({
      next: (res) => this.turnos = res,
      error: (err) => console.error('Error al obtener los turnos:', err)
    });
  }

  marcar(turno: TurnoOdontologo) {
  const asistencia = {
    asistio: turno.asistio
  };

  this.turnoService.marcarAsistencia(turno.id, asistencia).subscribe({
    next: () => console.log('Asistencia actualizada.'),
    error: (err) => console.error('Error al actualizar asistencia:', err)
  });
}


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  
  }
      }
