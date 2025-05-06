import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',  
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router : Router){}

  logout() {
    localStorage.removeItem('token'); // Borra el token
    this.router.navigate(['/login']); // Redirige al login
  }

  @ViewChild('drawer') drawer!: MatSidenav;

  sidenavMode: 'side' | 'over' = 'side'; // ← inicialmente desktop
  sidenavOpened = true;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSidenavMode(event.target.innerWidth);
  }

  updateSidenavMode(width: number) {
    if (width < 768) {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    } else {
      this.sidenavMode = 'side';
      this.sidenavOpened = true;
    }
  }

  closeDrawer() {
    if (this.sidenavMode === 'over') {
      this.drawer.close();
    }
  }

 

}
