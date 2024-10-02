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
    return this.http.post(this.apiurl, eventData);
  }
}
