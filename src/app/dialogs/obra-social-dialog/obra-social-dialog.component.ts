import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-obra-social-dialog',
  standalone: true,
  templateUrl: './obra-social-dialog.component.html',
  styleUrls: ['./obra-social-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ObraSocialDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ObraSocialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: [data?.obraSocial?.nombre || '', Validators.required],
      descripcion: [data?.obraSocial?.descripcion || '']
    });
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get nombre() {
    return this.form.get('nombre');
  }
  
}
