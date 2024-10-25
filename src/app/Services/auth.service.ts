import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { BehaviorSubject} from 'rxjs';
import { apiurl } from './ApiUrl';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';



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

  // Méthode pour se connecter
  login(identifiant: any): Observable<any> {
    return this.http.post(`${apiurl}/login`, identifiant);
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

    return this.http.post(`${apiurl}/logout`, {}, { headers }).pipe(
      tap(() => {
        // Supprimer le token et informer que l'utilisateur est déconnecté
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.isLoggedInSubject.next(false); // Mise à jour de l'état de connexion
      }),
      catchError((error) => {
        if (error.status === 401) {
          console.error('Invalid or expired token, forced logout.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.isLoggedInSubject.next(false); // Mise à jour de l'état de connexion
        }
        return throwError(error);
      })
    );
  }
    // Méthode pour l'inscription
    register(identifiant: any): Observable<any> {
      return this.http.post(`${apiurl}/register`, identifiant).pipe(
        catchError((error) => {
          console.error('Registration failed:', error);
          return throwError(error);
        })
      );
    }
    getUserId(): number {
      // Remplacez par votre méthode pour récupérer l'ID utilisateur
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.id; // Assurez-vous que l'ID est stocké dans localStorage
    }
    isTokenExpired(token: string): boolean {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000; // La date d'expiration est en secondes
      return expirationDate < Date.now();
    }
  
}

  

 