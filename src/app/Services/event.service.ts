import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiurl = 'http://127.0.0.1:8000/api/evenements'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}
  createEvent(eventData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Assurez-vous que le jeton est correctement enregistré dans le localStorage
    const headers = { 'Authorization': `Bearer ${token}` };
  
    // Envoyez les données de l'événement ainsi que les en-têtes
    return this.http.post(this.apiurl, eventData, { headers });
  }
   // Méthode pour récupérer les événements
   getUserEvents(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.apiurl}`, { headers});
  }
}
