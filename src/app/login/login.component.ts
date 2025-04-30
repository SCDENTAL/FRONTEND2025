import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import {MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    MatCardModule,
    MatFormFieldModule,    
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(response => {
      localStorage.setItem('token', response.token);

      const role = this.authService.getUserRole();

      if (role === 'Administrador') {
        this.router.navigate(['/admin']);
      } else if (role === 'Odontologo') {
        this.router.navigate(['/odontologo']);
      } else {
        this.router.navigate(['/login']);
      }
    }, error => {
      console.error('Error al iniciar sesión', error);
      // Podés mostrar un mensaje de error acá con un snackbar
    });


}

}
