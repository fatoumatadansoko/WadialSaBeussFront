import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { apiurl } from './ApiUrl';
import { UserModel } from '../Models/users.model';
import { error } from 'console';


@Injectable({
    providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/users'; // Remplacez par l'URL de votre API

    private http = inject(HttpClient);

 // Methode pour recuperer toutes les users 

  constructor(private htttp: HttpClient) {}

  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(this.apiUrl, { headers });
  }
    // Afficher les details d'un seul user
    getUser(id: number): Observable<any> {
         const token = localStorage.getItem('access_token');
        
         if (!token) {
             console.error('No authentication token found');
            return throwError('No authentication token found');
         }
    
        const headers = new HttpHeaders({
             'Authorization': `Bearer ${token}`
        });
    
         return this.http.get<any>(`${apiurl}users/${id}`, { headers });
     }

   // Méthode pour inscrire un utilisateur (prestataire ou client)
  register(user: any): Observable<any> {
        return this.http.post(`${apiurl}/register`, user);
    
  }
 

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }

 }
