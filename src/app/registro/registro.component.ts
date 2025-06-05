import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {


  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';


  hide: boolean = true;
  hideConfirm: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  irALogin() {
    this.router.navigate(['/login']);
  }

  registrar() {
    if (!this.nombre || !this.email || !this.password || !this.confirmPassword) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
      return;
    }

    this.authService.register(this.email, this.password, this.nombre)
      .subscribe({
        next: (response) => {
          Swal.fire('Éxito', 'Registro exitoso. Ahora podés iniciar sesión.', 'success')
            .then(() => {
              this.router.navigate(['/login']);
            });
        },
        error: (error) => {
          console.error('Error en el registro', error);
          const mensaje = error?.error?.message || 'No se pudo completar el registro.';
          Swal.fire('Error', mensaje, 'error');
        }
      });
  }
}
