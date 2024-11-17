import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
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
envoyerCarte(carteId: number, formData: FormData): Observable<any> {
  return this.http.post(`${apiUrl}/cartes-personnalisees/${carteId}/envoyer`, formData);
}



getInvites(id: number): Observable<any> {
  // const token = localStorage.getItem('token');
  // const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  return this.http.get(`${apiUrl}/cartes-personnalisees/${id}/invites`);
}
// Ajoutez cette méthode au service existant
getCarteByIdAndToken(id: number, token: string) {
  return this.http.get(`${apiUrl}/cartes-personnalisees/${id}?token=${token}`);
}


// Méthode pour vérifier si un token est valide
validateInvitationToken(token: string): Observable<any> {
  return this.http.post(`${apiUrl}/verify-invitation`, { token });
}
  }
  