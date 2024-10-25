import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { carteinvitationModel } from '../Models/carteinvitation.model';
import { apiUrl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class CartepersonnaliseeService {

  private http = inject(HttpClient);

  constructor(private htttp: HttpClient) {}


 
     // Méthodes pour lister les cartes
  getCarteinvitationById(id: number): Observable<any> {
    // const token = localStorage.getItem('token');
    // const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${apiUrl}/cartes/${id}`);
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
    return this.http.post(`${apiUrl}/cartes-personnalisees/invitation/${id}/create`, formData, {
      headers: new HttpHeaders(headers)
    });
  }
  

getCartesByClientId(clientId: number): Observable<any> {
  // const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur
  // const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
  return this.http.get(`${apiUrl}/cartes-personnalisees/client/${clientId}`);
}
// Dans CartepersonnaliseeService
envoyerCarte(id: number, invites: { nom: string, email: string }[]): Observable<any> {
  const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const body = { invites }; // Utilise le tableau d'invités avec nom et email
  
  return this.http.post(`${apiUrl}/cartes-personnalisees/${id}/envoyer`, body, { headers });
}


getInvites(id: number): Observable<any> {
  // const token = localStorage.getItem('token');
  // const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  return this.http.get(`${apiUrl}/cartes-personnalisees/${id}/invites`);
}

  }
  

