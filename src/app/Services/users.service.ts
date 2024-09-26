import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { apiurl } from './ApiUrl';
import { UserModel } from '../Models/users.model';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);

 // Methode pour recuperer toutes les users 
 getAllUser(){
    return this.http.get(`${apiurl}/users`);
}

    // Afficher les details d'un seul user
    // getUser(id: number): Observable<any> {
    //     const token = localStorage.getItem('access_token');
        
    //     if (!token) {
    //         console.error('No authentication token found');
    //         return throwError('No authentication token found');
    //     }
    
    //     const headers = new HttpHeaders({
    //         'Authorization': `Bearer ${token}`
    //     });
    
    //     return this.http.get<any>(`${apiurl}users/${id}`, { headers });
    // }

    // Méthode pour activer/désactiver l'utilisateur
//     activateUser(id: number): Observable<any> {
//         const token = localStorage.getItem('access_token');
        
//         if (!token) {
//             console.error('No authentication token found');
//             return throwError('No authentication token found');
//         }
    
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${token}`
//         });
    
//         return this.http.post<any>(`${apiurl}users/${id}/activate`, {}, { headers })
//             .pipe(
//                 catchError(this.handleError)
//             );
//     }

//     deactivateUser(id: number): Observable<any> {
//         const token = localStorage.getItem('access_token');
        
//         if (!token) {
//             console.error('No authentication token found');
//             return throwError('No authentication token found');
//         }
    
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${token}`
//         });
    
//         return this.http.post<any>(`${apiurl}users/${id}/deactivate`, {}, { headers })
//             .pipe(
//                 catchError(this.handleError)
//             );
//     }
//     private handleError(error: any) {
//         console.error('An error occurred', error);
//         return throwError('Something went wrong; please try again later.');
//     }

//     // Méthode pour supprimer un user
//     deleteUser(id: number): Observable<any> {
//         const token = localStorage.getItem('access_token');
        
//         if (!token) {
//             console.error('No authentication token found');
//             return throwError('No authentication token found');
//         }
    
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${token}`
//         });
    
//         return this.http.delete<any>(`${apiurl}users/${id}`, { headers })
//             .pipe(
//                 catchError(this.handleError)
//             );
//     }

//     // Méthode pour afficher les informations de l'utilisateur connecté
//     getMe(): Observable<any> {
//         const token = localStorage.getItem('access_token');
        
//         if (!token) {
//             console.error('No authentication token found');
//             return throwError('No authentication token found');
//         }
    
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${token}`
//         });
    
//         return this.http.get<any>(`${apiurl}user_connecte`, { headers });
//     }
    
// }
}