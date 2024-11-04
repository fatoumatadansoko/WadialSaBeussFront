// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      return this.authService.isLoggedIn().pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
          }
  
          const requiredRole = route.data['role'] as string;
          const userRole = this.authService.getUserRole();
  
          if (requiredRole && userRole !== requiredRole) {
            this.router.navigate(['/unauthorized']); // Redirige si le rôle est incorrect
            return false;
          }
  
          return true;
        })
      );
    }
  }
