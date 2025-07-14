import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { ObraSocial } from '../../interface/obra-social';
import { Paciente } from '../../interface/paciente';
import { PacienteService } from '../../service/paciente.service';
import { ObraSocialService } from '../../service/obra-social.service';

@Component({
  selector: 'app-pacientes-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
  templateUrl: './pacientes-dialog.component.html',
  styleUrl: './pacientes-dialog.component.scss'
})
export class PacientesDialogComponent implements OnInit {
  form!: FormGroup;
  obrasSociales: ObraSocial[] = [];
  obrasSocialesFiltradas: ObraSocial[] = [];
  obraSocialFiltroControl = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private obraSocialService: ObraSocialService,
    private pacienteService: PacienteService,
    private dialogRef: MatDialogRef<PacientesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { paciente?: Paciente }
  ) {}

  ngOnInit(): void {
    this.obraSocialService.getObrasSociales().subscribe({
      next: (obras) => {
        this.obrasSociales = obras;
        this.obrasSocialesFiltradas = obras;
        this.inicializarFormulario();

        this.obraSocialFiltroControl.valueChanges
          .pipe(
            startWith(''),
            map(valor => this.filtrarObrasSociales(valor || ''))
          )
          .subscribe(filtered => this.obrasSocialesFiltradas = filtered);
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar las obras sociales', 'error');
      }
    });
  }

  private filtrarObrasSociales(valor: string): ObraSocial[] {
    const filtro = valor.toLowerCase();
    return this.obrasSociales.filter(o => o.nombre.toLowerCase().includes(filtro));
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

    const pacienteDTO = {
      id: this.data?.paciente?.id || 0,
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      dni: formValue.dni,
      telefono: formValue.telefono,
      email: formValue.email,
      obraSocialId: +formValue.obraSocialId
    };

    const request = this.data?.paciente
      ? this.pacienteService.actualizarPaciente(pacienteDTO.id, pacienteDTO)
      : this.pacienteService.crearPaciente(pacienteDTO);

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

  onCancel(): void {
    this.dialogRef.close();
  }

  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get dni() { return this.form.get('dni'); }
  get telefono() { return this.form.get('telefono'); }
  get email() { return this.form.get('email'); }
  get obraSocialId() { return this.form.get('obraSocialId'); }
}
