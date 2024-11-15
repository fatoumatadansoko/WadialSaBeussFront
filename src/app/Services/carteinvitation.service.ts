import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
   
    return this.http.get(`${apiUrl}/cartes`);
  }
    
    // Méthodes pour lister les cartes
  getCarteinvitationById(id: number): Observable<any> {
<<<<<<< HEAD
   
    return this.http.get(`${apiUrl}/cartes/${id}`);
  }
  //personnalisation de carte
  updateCarte(id: number, formData: FormData): Observable<any> {
  
    return this.http.post(`${apiUrl}/cartes-personnalisees/invitation/${id}/create`, formData, {
=======
    // const token = localStorage.getItem('token');
    // const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  //personnalisation de carte
  updateCarte(id: number, formData: FormData): Observable<any> {
    // const token = localStorage.getItem('token');
    
    // // Assure-toi que le token est présent
    // if (!token) {
    //   throw new Error('Token manquant. Veuillez vous reconnecter.');
    // }
  
    // // Ajouter l'en-tête Authorization avec le token
    // const headers = { 'Authorization': `Bearer ${token}` };
  
    // Effectuer la requête HTTP
    return this.http.post(`${apiurl}/cartes-personnalisees/invitation/${id}/create`, formData, {
>>>>>>> origin/develop
      headers: new HttpHeaders()
    });
  }
  
getCartesByCategory(categoryId: number): Observable<any> {
  return this.http.get(`${apiUrl}/cartes/category/${categoryId}`);
}
getCartesByClientId(clientId: number): Observable<any> {

  
  return this.http.get(`${apiUrl}cartes-personnalisees/client/${clientId}`);
}
addCarte(formData: FormData): Observable<any> {
<<<<<<< HEAD
 
  return this.http.post(`${apiUrl}/cartes`,formData);
}

getAllCategories() {
   
  return this.http.get(`${apiUrl}/categories`);
=======
  // const token = localStorage.getItem('token'); 
  // const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  // Effectuer la requête HTTP pour créer la carte
  return this.http.post(`${apiurl}/cartes`,formData);
}

getAllCategories() {
  // const token = localStorage.getItem('token');
  // const headers = { 'Authorization': `Bearer ${token}` };    
  return this.http.get(`${apiurl}/categories`);
>>>>>>> origin/develop
  
  // Méthodes pour lister les categories
}
 // Méthode pour mettre à jour une carte pour l'admin
 modifierCarte(id: number, formData: FormData): Observable<any> {
  const headers = new HttpHeaders();  // Headers personnalisés si besoin

<<<<<<< HEAD
  return this.http.post(`${apiUrl}/cartes/${id}`, formData);
}
deleteCarte(id: number): Observable<any> {
  
  return this.http.delete(`${apiUrl}/cartes/cartes/${id}`);
=======
  return this.http.post(`${this.apiUrl}/${id}`, formData);
}
deleteCarte(id: number): Observable<any> {
  // const token = localStorage.getItem('token');
  // const headers = {
  //   'Authorization': `Bearer ${token}`,
  // };

  return this.http.delete(`${this.apiUrl}/cartes/${id}`);
>>>>>>> origin/develop
}

}
