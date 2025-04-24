import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = route.data['expectedRole'];
    const userRole = this.auth.getUserRole();

    if (expectedRole && expectedRole !== userRole) {
      if (userRole === 'Administrador') {
        this.router.navigate(['/admin']);
      } else if (userRole === 'Odontologo') {
        this.router.navigate(['/odontologo']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }

    return true;
  }
}
