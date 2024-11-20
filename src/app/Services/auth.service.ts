import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { BehaviorSubject} from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { apiUrl } from './ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private http = inject(HttpClient);
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  
  // Observable pour le statut de connexion
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }
  // Vérifie si l'utilisateur a un rôle donné
  getCurrentRole(): string | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.role;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
  hasRole(role: string): boolean {
    const currentRole = this.getCurrentRole();
    return currentRole === role;
  }


  // Méthode pour se connecter
  login(identifiant: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, identifiant).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('userRole', response.user.role); // Stocker le rôle

          // Mettre à jour les BehaviorSubjects
          this.isLoggedInSubject.next(true); 
          this.userRoleSubject.next(response.user.role); // Mettre à jour le rôle dans le BehaviorSubject
        }
      }),
      catchError((error) => {
        console.error('Erreur lors de la connexion:', error);
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
  getUser(): Observable<any> {
    return this.http.get(`${apiUrl}/getUser`);
  }
}


 