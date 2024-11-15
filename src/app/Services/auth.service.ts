import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { apiUrl } from './ApiUrl';


interface User {
  id: number;
  roles: string[];
  description?:string;
  nom?: string;
  email?: string;
  password?: string;
  adresse?: string;
  telephone?: string;
  statut?: "active";
  createdAt?: Date;
  updatedAt?: Date;
  logo?:string;
  // Ajoutez d'autres propriétés selon votre modèle utilisateur
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private isBrowser: boolean;
    
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    authStatus$ = this.isLoggedInSubject.asObservable();
  
    constructor(@Inject(PLATFORM_ID) platformId: Object) {
      this.isBrowser = isPlatformBrowser(platformId);
      if (this.isBrowser) {
        this.checkInitialAuthStatus();
      }
    }
  
    private checkInitialAuthStatus(): boolean {
      if (!this.isBrowser) return false;
      
      const token = localStorage.getItem('token');
      if (!token) return false;
  
      const isValid = !this.isTokenExpired(token);
      this.isLoggedInSubject.next(isValid);
      return isValid;
    }
  

  register(identifiant: any): Observable<any> {
    return this.http.post(`${apiUrl}/register`, identifiant).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'inscription:', error);
        return throwError(() => error);
      })
    );
  }

  login(identifiant: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, identifiant).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.isLoggedInSubject.next(true);
        }
      }),
      catchError((error) => {
        console.error('Erreur de connexion:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.handleLogoutSuccess();
      return throwError(() => new Error('Aucun token trouvé'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        this.handleLogoutSuccess();
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.handleLogoutSuccess();
        }
        return throwError(() => error);
      })
    );
  }

  private handleLogoutSuccess(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.authStatus$;
  }
<<<<<<< HEAD

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
=======
    getUserId(): number {
      
      // Remplacez par votre méthode pour récupérer l'ID utilisateur
      const user = JSON.parse(typeof window !== 'undefined' && localStorage.getItem('user') || '{}');
      return user.id; // Assurez-vous que l'ID est stocké dans localStorage
>>>>>>> origin/develop
    }
  }

  getUserId(): number | null {
    const user = this.getCurrentUser();
    return user?.id || null;
  }

  isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      return (decodedToken.exp * 1000) < Date.now();
    } catch {
      return true;
    }
  }

  updateAuthStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  // Méthode pour rafraîchir le token si nécessaire
  refreshToken(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Aucun token trouvé'));
    }

    // Implémentez votre logique de rafraîchissement de token ici
    return this.http.post(`${apiUrl}/refresh-token`, {}).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  // Méthode utilitaire pour vérifier si l'utilisateur a un rôle spécifique
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role) || false;
  }
}