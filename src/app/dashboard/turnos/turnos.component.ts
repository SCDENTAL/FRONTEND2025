import { Component } from '@angular/core';


import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { CalendarioComponent } from "./calendario/calendario.component";

@Component({
  selector: 'app-turnos',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    CalendarioComponent
  ],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent {

}