import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',  
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router : Router){}

  logout() {
    localStorage.removeItem('token'); // Borra el token
    this.router.navigate(['/login']); // Redirige al login
  }

}
