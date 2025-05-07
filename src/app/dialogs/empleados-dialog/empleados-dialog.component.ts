import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmpleadosService } from '../../service/empleados.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './empleados-dialog.component.html',
  styleUrls: ['./empleados-dialog.component.scss']
})
export class EmpleadosDialogComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadosService,
    private dialogRef: MatDialogRef<EmpleadosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { empleado?: CrearEmpleado }
  ) {
    this.form = this.fb.group({
      nombre: [data?.empleado?.nombre || '', Validators.required],
      email: [data?.empleado?.email || '', [Validators.required, Validators.email]],
      password: [data?.empleado?.password || '', Validators.required]
    });
  }

  onSave(): void {
    if (this.form.invalid) return;

    const empleadoData: CrearEmpleado = this.form.value;

    const request = this.data?.empleado
      ? this.empleadoService.actualizarEmpleado((this.data.empleado as any).id, empleadoData)
      : this.empleadoService.crearEmpleado(empleadoData);

    const mensajeAccion = this.data?.empleado ? 'editado' : 'creado';

    request.subscribe({
      next: () => {
        Swal.fire('Éxito', `Odontólogo ${mensajeAccion} con éxito`, 'success');
        this.dialogRef.close(true);
      },
      error: () => {
        Swal.fire('Error', `No se pudo ${mensajeAccion} el odontólogo`, 'error');
      }
    });
  }

  

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get nombre() { return this.form.get('nombre'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}

export interface CrearEmpleado {
  nombre: string;
  email: string;
  password: string;
}
