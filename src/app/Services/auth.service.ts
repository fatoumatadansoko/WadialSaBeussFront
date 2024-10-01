import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { BehaviorSubject} from 'rxjs';
import { apiurl } from './ApiUrl';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCategoriePrestataires() {
    throw new Error('Method not implemented.');
  }

  private http = inject(HttpClient);
  
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {}

  // Vérifier si le token est présent dans le localStorage
  public hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Observable pour le statut de connexion
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Méthode pour définir l'état de connexion
  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  // Méthode pour se connecter
  login(identifiant: any): Observable<any> {
    return this.http.post(`${apiurl}/login`, identifiant).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.setLoggedIn(true);
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
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
  
    return this.http.post(`${apiurl}logout`, {}, { headers }).pipe(
      tap(() => {
        // Supprimer les informations de l'utilisateur et du token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setLoggedIn(false);
      }),
      catchError((error) => {
        if (error.status === 401) {
          console.error('Invalid or expired token, forced logout.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.setLoggedIn(false);
        }
        return throwError(error);
      })
    );
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.hasToken();
  }
}