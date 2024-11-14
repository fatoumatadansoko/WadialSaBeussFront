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
 
    return this.http.post(`${apiUrl}/evenements`, eventData);
  }
   // Méthode pour récupérer les événements
   getUserEvents(userId: number): Observable<any> {
    return this.http.get(`${apiUrl}/evenements`);
  }
  getEvents(): Observable<any> {
    return this.http.get(`${apiUrl}/admin/events/`);
  }
}
