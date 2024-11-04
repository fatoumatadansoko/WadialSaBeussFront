import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { apiUrl } from './ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private http = inject(HttpClient);
  
  // Observable pour le statut de connexion
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // Vérifie si l'utilisateur a un rôle donné
  hasRole(role: string): boolean {
    const userRole = localStorage.getItem('userRole'); // Simuler le rôle de l’utilisateur
    return userRole === role;
  }

  // Nouvelle méthode pour obtenir le rôle de l'utilisateur
  getUserRole(): string | null {
    return localStorage.getItem('userRole'); // Retourne le rôle de l'utilisateur ou null
  }

  // Méthode pour se connecter
  login(identifiant: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, identifiant).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          // Supposons que le rôle est dans la réponse utilisateur
          localStorage.setItem('userRole', response.user.role); // Stocker le rôle de l'utilisateur
          this.isLoggedInSubject.next(true); // Met à jour l'état de connexion
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour se déconnecter
  logout(): Observable<any> {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('No authentication token found');
      return throwError('No authentication token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        // Supprimer le token et informer que l'utilisateur est déconnecté
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole'); // Supprimer le rôle de l'utilisateur
        this.isLoggedInSubject.next(false); // Mise à jour de l'état de connexion
      }),
      catchError((error) => {
        if (error.status === 401) {
          console.error('Invalid or expired token, forced logout.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userRole'); // Supprimer le rôle de l'utilisateur
          this.isLoggedInSubject.next(false); // Mise à jour de l'état de connexion
        }
        return throwError(error);
      })
    );
  }

  // Méthode pour l'inscription
  register(identifiant: any): Observable<any> {
    return this.http.post(`${apiUrl}/register`, identifiant).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(error);
      })
    );
  }

  getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id; // Assurez-vous que l'ID est stocké dans localStorage
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const expirationDate = decodedToken.exp * 1000; // La date d'expiration est en secondes
    return expirationDate < Date.now();
  }
}


 