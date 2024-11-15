import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
interface ApiResponse<T> {
  status: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiurl = 'http://127.0.0.1:8000/api/evenements'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}
<<<<<<< HEAD

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createEvent(eventData: any): Observable<ApiResponse<Event>> {
    return this.http.post<ApiResponse<Event>>(
      this.apiurl,
      eventData,
      { headers: this.getHeaders() }
    );
=======
  createEvent(eventData: any): Observable<any> {
    // const token = localStorage.getItem('token'); // Assurez-vous que le jeton est correctement enregistré dans le localStorage
    // const headers = { 'Authorization': `Bearer ${token}` };
  
    // Envoyez les données de l'événement ainsi que les en-têtes
    return this.http.post(this.apiurl, eventData);
  }
   // Méthode pour récupérer les événements
   getUserEvents(userId: number): Observable<any> {
  //   const token = localStorage.getItem('token');
  // const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.apiurl}`);
  }
  getEvents(): Observable<any> {
  //   const token = localStorage.getItem('token');
  // const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${apiurl}/admin/events/`);
>>>>>>> origin/develop
  }

  getUserEvents(userId: number): Observable<ApiResponse<Event[]>> {
    return this.http.get<ApiResponse<Event[]>>(
      `${this.apiurl}`,
      { headers: this.getHeaders() }
    );
  }

  getEvents(): Observable<ApiResponse<Event[]>> {
    return this.http.get<ApiResponse<Event[]>>(
      `${this.apiurl}/admin/events/`,
      { headers: this.getHeaders() }
    );
  }
}