import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor {
  
  intercept: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    const router = inject(Router);

    if (!token) {      
      return next(req);
    }

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned);
  }
}
