import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CalendarioService } from '../../service/calendario.service';
import { CrearCalendarioDTO } from '../../interface/CalendarioDTO/crearcalendariodto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-calendario-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCheckboxModule

  ],
  templateUrl: './calendario-dialog.component.html',
  styleUrl: './calendario-dialog.component.scss',

})
export class CalendarioDialogComponent implements AfterViewInit {


  calendarioForm: FormGroup;
  mostrarFormulario = false;
  

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CalendarioDialogComponent>,
    private cdRef: ChangeDetectorRef,
    private calendarioService : CalendarioService,
  ) {
    this.calendarioForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      horaInicioTurnos: ['', Validators.required],
      horaFinTurnos: ['', Validators.required],
      intervaloTurnos: ['', Validators.required],
      excluirDomingo: [false]
    });

  }

  ngAfterViewInit(): void {    
    setTimeout(() => {
      this.mostrarFormulario = true;
      this.cdRef.detectChanges();
    });    
    setTimeout(() => {
      this.mostrarFormulario = true;
      this.cdRef.detectChanges();
    }, 0);
  }

 guardar(): void {
  if (this.calendarioForm.valid) {
    const datos = this.calendarioForm.value;
    this.dialogRef.close(datos);
  }
}

   enviarCalendario(): void {
    const formValue = this.calendarioForm.value;

    const parseHora = (valor: string) => {
      const partes = valor.split(':');
      return Number(partes[0]) + (Number(partes[1] || 0) / 60);
    };

    const dto: CrearCalendarioDTO = {
      nombre: formValue.nombre,
      fechaInicio: new Date(formValue.fechaInicio).toISOString(),
      fechaFin: new Date(formValue.fechaFin).toISOString(),
      horaInicioTurnos: parseHora(formValue.horaInicioTurnos),
      horaFinTurnos: parseHora(formValue.horaFinTurnos),
      intervaloTurnos: parseInt(formValue.intervaloTurnos.split(':')[1] || formValue.intervaloTurnos),
      excluirDomingo: formValue.excluirDomingo
    };

    this.calendarioService.crearCalendario(dto).subscribe({
      next: (nuevoCalendario) => {
        Swal.fire('Calendario creado');
        this.dialogRef.close(nuevoCalendario); 
      },
      error: (err) => {        
        Swal.fire('Error al crear calendario');
      }
    });
  }


  cancelar(): void {
    this.dialogRef.close();
  }
}






