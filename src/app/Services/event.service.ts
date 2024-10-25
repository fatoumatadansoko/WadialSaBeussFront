import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './ApiUrl';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  constructor(private http: HttpClient) {}
  createEvent(eventData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Assurez-vous que le jeton est correctement enregistré dans le localStorage
    const headers = { 'Authorization': `Bearer ${token}` };
  
    // Envoyez les données de l'événement ainsi que les en-têtes
    return this.http.post(`${apiUrl}/evenements`, eventData, { headers });
  }
   // Méthode pour récupérer les événements
   getUserEvents(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${apiUrl}/evenements`, { headers});
  }
  getEvents(): Observable<any> {
    const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${apiUrl}/evenements/admin/events/`, { headers});
  }
}
