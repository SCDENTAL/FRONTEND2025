<<<<<<< HEAD
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
=======
import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule, MatIconAnchor, MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
>>>>>>> 9ef5bf4ab63e1a6cf1e9e4291dfa49080add21c5


@Component({
  selector: 'app-dashboard',  
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
<<<<<<< HEAD
    MatButtonModule],
=======
    MatButtonModule,
    MatIconModule
    ],
>>>>>>> 9ef5bf4ab63e1a6cf1e9e4291dfa49080add21c5
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

<<<<<<< HEAD
  constructor(private router : Router){}
=======
  constructor(private router : Router) {
    this.updateSidenavMode(window.innerWidth);
  }  
>>>>>>> 9ef5bf4ab63e1a6cf1e9e4291dfa49080add21c5

  logout() {
    localStorage.removeItem('token'); // Borra el token
    this.router.navigate(['/login']); // Redirige al login
  }

<<<<<<< HEAD
=======
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

 

>>>>>>> 9ef5bf4ab63e1a6cf1e9e4291dfa49080add21c5
}
