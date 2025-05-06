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
import { MatSelectModule } from '@angular/material/select';
import { Paciente } from '../../interface/paciente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes-dialog',
  standalone: true,
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


  form!: FormGroup;
  obrasSociales: ObraSocial[] = [];

  constructor(
    private fb: FormBuilder,
    private obraSocialService: ObraSocialService,
    private pacienteService: PacienteService,
    private dialogRef: MatDialogRef<PacientesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { paciente?: Paciente }
  ) {
    this.cargarObrasSociales();
  }

  private cargarObrasSociales(): void {
    this.obraSocialService.getObrasSociales().subscribe({
      next: (obras) => {
        this.obrasSociales = obras;
        this.inicializarFormulario(); // Inicializa después de cargar las obras sociales
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar las obras sociales', 'error');
      }
    });
  }

  private inicializarFormulario(): void {
    this.form = this.fb.group({
      nombre: [this.data?.paciente?.nombre || '', Validators.required],
      apellido: [this.data?.paciente?.apellido || '', Validators.required],
      dni: [this.data?.paciente?.dni || '', Validators.required],
      telefono: [this.data?.paciente?.telefono || '', Validators.required],
      email: [this.data?.paciente?.email || '', [Validators.required, Validators.email]],
      obraSocialId: [
        this.data?.paciente?.obraSocial
          ? this.obtenerIdObraSocialPorNombre(this.data.paciente.obraSocial)
          : '',
        Validators.required
      ]
    });
  }

  private obtenerIdObraSocialPorNombre(nombre: string): number | null {
    const obra = this.obrasSociales.find(o => o.nombre === nombre);
    return obra ? obra.id : null;
  }

  onSave(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const obraSocial = this.obrasSociales.find(o => o.id === +formValue.obraSocialId);

    const paciente: Paciente = {
      id: this.data?.paciente?.id || 0,
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      dni: formValue.dni,
      telefono: formValue.telefono,
      email: formValue.email,
      obraSocial: obraSocial?.nombre || ''
    };

    const request = this.data?.paciente
      ? this.pacienteService.actualizarPaciente(paciente.id, paciente)
      : this.pacienteService.crearPaciente(paciente);

    request.subscribe({
      next: () => {
        const mensaje = this.data?.paciente ? 'editado' : 'creado';
        Swal.fire('Éxito', `Paciente ${mensaje} con éxito`, 'success');
        this.dialogRef.close(true);
      },
      error: () => {
        const mensaje = this.data?.paciente ? 'editar' : 'crear';
        Swal.fire('Error', `No se pudo ${mensaje} el paciente`, 'error');
      }
    });
  }
  
  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get dni() { return this.form.get('dni'); }
  get telefono() { return this.form.get('telefono'); }
  get email() { return this.form.get('email'); }
  get obraSocialId() { return this.form.get('obraSocialId'); }

  onCancel(): void {
    this.dialogRef.close();
  }
}
