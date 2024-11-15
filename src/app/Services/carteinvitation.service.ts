import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { carteinvitationModel } from '../Models/carteinvitation.model';
import { apiUrl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class CarteinvitationService {

  private http = inject(HttpClient);

  constructor(private htttp: HttpClient) {}


  //methodes pour récupérer toutes les cartes

  getAllCarteinvitations(): Observable<any> {
    return this.http.get(`${apiUrl}/cartes`,);
  }
    
    // Méthodes pour lister les cartes
  getCarteinvitationById(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/cartes/${id}`,);
  }
  updateCarte(id: number, formData: FormData): Observable<any> {
        
    return this.http.post(`${apiUrl}/cartes-personnalisees/invitation/${id}/create`, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Une erreur est survenue';
          if (error.error?.errors) {
            errorMessage = Object.values(error.error.errors)
              .flat()
              .join('\n');
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }
  
  
getCartesByCategory(categoryId: number): Observable<any> {
  return this.http.get(`${apiUrl}/cartes/category/${categoryId}`);
}
getCartesByClientId(clientId: number): Observable<any> {  
  return this.http.get(`${apiUrl}cartes-personnalisees/client/${clientId}`);
}
addCarte(formData: FormData): Observable<any> {
  const token = localStorage.getItem('token'); 
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  // Effectuer la requête HTTP pour créer la carte
  return this.http.post(`${apiUrl}/cartes`,formData, { headers });
}

getAllCategories() {   
  return this.http.get(`${apiUrl}/categories`);
  
}

}