import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { apiurl } from './ApiUrl';
import { UserModel } from '../Models/users.model';
import { error } from 'console';
import { CategoriePrestataireModel } from '../Models/categorieprestataire.model';


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

  getCategorieprestataires(): Observable<CategoriePrestataireModel[]> {
    return this.http.get<{ status: boolean; message: string; data: CategoriePrestataireModel[] }>(`${apiurl}/categoriesprestataires`).pipe(
      map((response: { data: any; }) => response.data) // Maintenant, 'response' est typé correctement
    );
  }
  

  // Récupérer les informations du profil utilisateur
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le token de l'utilisateur connecté
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${apiurl}/profile`, { headers });
  }
   // Méthode pour inscrire un utilisateur (prestataire ou client)
  register(formData: FormData) {
    return this.http.post(`${apiurl}/register`, formData);
}



private handleError(error: any) {
console.error('An error occurred', error);
return throwError('Something went wrong; please try again later.');
}
  
    }
  

  

 
