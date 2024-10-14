import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { apiurl } from './ApiUrl';
import { carteinvitationModel } from '../Models/carteinvitation.model';


@Injectable({
    providedIn: 'root'
})
export class CarteinvitationService {
  private apiUrl = 'http://127.0.0.1:8000/api/cartes'; // Remplacez par l'URL de votre API

  private http = inject(HttpClient);

  constructor(private htttp: HttpClient) {}


  //methodes pour récupérer toutes les cartes

  getAllCarteinvitations(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(this.apiUrl, { headers });
  }
    
    // Méthodes pour lister les cartes
  getCarteinvitationById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }
  updateCarte(id: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    
    // Assure-toi que le token est présent
    if (!token) {
      throw new Error('Token manquant. Veuillez vous reconnecter.');
    }
  
    // Ajouter l'en-tête Authorization avec le token
    const headers = { 'Authorization': `Bearer ${token}` };
  
    // Effectuer la requête HTTP
    return this.http.post(`${apiurl}/cartes-personnalisees/invitation/${id}/create`, formData, {
      headers: new HttpHeaders(headers)
    });
  }
  
getCartesByCategory(categoryId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/category/${categoryId}`);
}
getCartesByClientId(clientId: number): Observable<any> {
  const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
  return this.http.get(`${apiurl}cartes-personnalisees/client/${clientId}`, { headers });
}
addCarte(formData: FormData): Observable<any> {
  const token = localStorage.getItem('token'); 
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  // Effectuer la requête HTTP pour créer la carte
  return this.http.post(`${apiurl}/cartes`,formData, { headers });
}

getAllCategories() {
  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };    
  return this.http.get(`${apiurl}/categories`, { headers });
  
  // Méthodes pour lister les categories
}
}
