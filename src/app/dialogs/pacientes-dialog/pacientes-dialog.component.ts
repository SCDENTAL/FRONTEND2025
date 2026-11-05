import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
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

  isSaving = false;
  telefonoPreview = '';

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
  ) { }

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
      dni: [this.data?.paciente?.dni || ''],
      telefono: [this.data?.paciente?.telefono || '', [this.telefonoArgentinoValidator]],
      email: [this.data?.paciente?.email || '', Validators.email],
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
    // 2. Si el formulario es inválido o ya estamos guardando, bloqueamos la ejecución
    if (this.form.invalid || this.isSaving) return;

    this.isSaving = true; // 3. Activamos el estado de guardado
    const formValue = this.form.value;

    const pacienteDTO = {
      id: this.data?.paciente?.id || 0,
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      dni: formValue.dni ? +formValue.dni : null,
      telefono: formValue.telefono || null,
      email: formValue.email || null,
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
      error: (err) => {
        this.isSaving = false;
        const fallback = this.data?.paciente ? 'No se pudo editar el paciente' : 'No se pudo crear el paciente';
        const mensaje = err?.error?.error || fallback;
        Swal.fire('Error', mensaje, 'error');
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  limpiarTelefono(valor: string): string {
    let num = valor.replace(/[\s\-\(\)\.]/g, '');
    if (num.startsWith('+549')) num = num.substring(4);
    else if (num.startsWith('+54')) num = num.substring(3);
    else if (num.startsWith('549')) num = num.substring(3);
    else if (num.startsWith('54')) num = num.substring(2);
    if (num.startsWith('0')) num = num.substring(1);
    if (num.length === 12 && num.includes('15')) {
      for (const pos of [2, 3, 4]) {
        if (num.substring(pos, pos + 2) === '15') {
          num = num.substring(0, pos) + num.substring(pos + 2);
          break;
        }
      }
    }
    return num;
  }

  onTelefonoBlur(): void {
    const raw = this.form.get('telefono')?.value || '';
    if (!raw) { this.telefonoPreview = ''; return; }
    const limpio = this.limpiarTelefono(raw);
    this.form.get('telefono')?.setValue(limpio, { emitEvent: false });
    this.actualizarPreviewTelefono(limpio);
  }

  private actualizarPreviewTelefono(num: string): void {
    if (/^\d{10}$/.test(num)) {
      const area = num.length === 10 && num.startsWith('11') ? num.substring(0, 2) : num.substring(0, 3);
      const resto = num.substring(area.length);
      this.telefonoPreview = `+54 9 ${area} ${resto}`;
    } else {
      this.telefonoPreview = '';
    }
  }

  private telefonoArgentinoValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) return null;
    const soloDigitos = valor.replace(/\D/g, '');
    if (soloDigitos.length !== 10) return { telefonoInvalido: true };
    return null;
  }

  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get dni() { return this.form.get('dni'); }
  get telefono() { return this.form.get('telefono'); }
  get email() { return this.form.get('email'); }
  get obraSocialId() { return this.form.get('obraSocialId'); }
}
