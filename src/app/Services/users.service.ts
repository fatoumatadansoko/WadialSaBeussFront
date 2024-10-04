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

 // Methode pour recuperer toutes les users 

 constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>(`${apiurl}/users`, { headers });
  }

    // Afficher les details d'un seul user
     // Méthode pour afficher les informations de l'utilisateur connecté
//      getMe(): Observable<any> {
//       const token = localStorage.getItem('token');

      
//       if (!token) {
//           console.error('No authentication token found');
//           return throwError('No authentication token found');
//       }
  
//       const headers = new HttpHeaders({
//           'Authorization': `Bearer ${token}`
//       });
  
//       return this.http.get<any>(`${apiurl}/users/7`, { headers });
//   }

//   getMe(id: number): Observable<any> {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       console.error('No authentication token found');
//       return throwError('No authentication token found');
//     }
  
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
  
//     return this.http.get<any>(`${apiurl}/users/${id}`, { headers }).pipe(
//       catchError((error) => {
//         console.error('Failed to fetch user details:', error);
//         return throwError(error);
//       })
//     );
//   }


  // Récupérer les informations du profil utilisateur
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur connecté
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiurl}/profile`, { headers });
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
  

  

 
