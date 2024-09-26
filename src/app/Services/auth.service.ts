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

  // Declaration des méthodes
  
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor() { }

 public hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }
  
  // Méthodes pour l'authentification
//   login(identifiant: any): Observable<any> {
//     console.log("login");
//     return this.http.post(`${apiurl}/login`, identifiant).pipe(
//       tap((response: any) => {
//         if (response.access_token) {
//           localStorage.setItem('access_token', response.access_token);
//           localStorage.setItem('user', JSON.stringify(response.user));
//           this.setLoggedIn(true);
//         }
//       })
//     );
//   }
//Login
login(identifienrts:any){
    return this.http.post(`${apiurl}/login`,identifienrts)
  }
  

  
  

  // Méthode pour l'inscription
  register(identifiant: any){
    return this.http.post(`${apiurl}/register`, identifiant);
    
  }

  // Méthodes pour se déconnecter
  logout() {
    const token = localStorage.getItem('access_token');
  
    if (!token) {
      console.error('No authentication token found');
      return throwError('No authentication token found');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${apiurl}logout`, {}, { headers }).pipe(
      // Remove the token and user data from localStorage after a successful response or in case of an error
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this.loggedIn.next(false);
      }),
      catchError((error) => {
        // If the error is 401 Unauthorized, the token is probably invalid or expired
        if (error.status === 401) {
          console.error('Invalid or expired token, forced logout.');
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          this.loggedIn.next(false);
        }
        // Propagate the error after handling forced logout
        return throwError(error);
      })
    );
  }
  
  

  // Méthode pour récuperer le nombre de users avec le role entrepreneur
  getEntrepreneurCount(): Observable<any> {
    return this.http.get<any>(`${apiurl}nombre_entrepreneur`);
  }

  // Méthode pour récuperer le nombre de users avec le role coach
  getCoachCount(): Observable<any> {
    return this.http.get<any>(`${apiurl}nombre_coach`);
  }

   
  
  
  // Méthode pour vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  
  
}
