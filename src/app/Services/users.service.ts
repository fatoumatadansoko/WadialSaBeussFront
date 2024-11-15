import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';

import { CategoriePrestataireModel } from '../Models/categorieprestataire.model';
import { apiUrl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class UserService {

 // Methode pour recuperer toutes les users 

 constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/users`);
  }

  getCategorieprestataires(): Observable<CategoriePrestataireModel[]> {
    return this.http.get<{ status: boolean; message: string; data: CategoriePrestataireModel[] }>(`${apiUrl}/categoriesprestataires`).pipe(
      map((response: { data: any; }) => response.data) // Maintenant, 'response' est typé correctement
    );
  }
  

  // Récupérer les informations du profil utilisateur
  getProfile(): Observable<any> {
  

    return this.http.get<any>(`${apiUrl}/profile`);
  }
   // Méthode pour inscrire un utilisateur (prestataire ou client)
  register(formData: FormData) {
    return this.http.post(`${apiUrl}/register`, formData);
}
// getUserDetails(): Observable<any> {
//   return this.http.get(`${apiUrl}/user`);
// }

updateProfile(updateData: any): Observable<any> {
  return this.http.post(`${apiUrl}/profile/update`, updateData);
}

updateProfileField(field: string, value: any): Observable<any> {
  const formData = new FormData();
  formData.append(field, value);
  return this.http.post(`${apiUrl}/profile/update`, formData);
}

private handleError(error: any) {
console.error('An error occurred', error);
return throwError('Something went wrong; please try again later.');
}
  
    }
  

  

  