import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {MatInputModule } from '@angular/material/input'
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,    
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    RouterModule 
       ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = '';
  password = '';
    

  constructor(private authService: AuthService, private router: Router) {}

  login() {
  if (!this.email || !this.password) {
    Swal.fire('Error', 'Por favor, completá todos los campos.', 'error');
    return;
  }

  this.authService.login(this.email, this.password).subscribe({
    next: (response) => {
      localStorage.setItem('token', response.token);

      Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success').then(() => {
        const role = this.authService.getUserRole();

        if (role === 'Administrador') {
          this.router.navigate(['/admin']);
        } else if (role === 'Odontologo') {
          this.router.navigate(['/odontologo']);
        } else {
          this.router.navigate(['/login']);
        }
      });
    },
    error: (err) => {
      console.error('Error al iniciar sesión', err);
      Swal.fire('Error', 'Email o contraseña incorrectos.', 'error');
    }
  });
}

irARegistro() {
  this.router.navigate(['/registro']);
}


}
