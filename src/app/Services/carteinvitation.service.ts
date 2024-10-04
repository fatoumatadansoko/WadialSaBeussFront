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
  updateCarte(id: number, carte: carteinvitationModel): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Assurez-vous d'inclure cet en-tête
    });
    
    // Passez l'objet carte dans le corps de la requête
    return this.http.post(`${this.apiUrl}/${id}`, carte, { headers });
}

}
