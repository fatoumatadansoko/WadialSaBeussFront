import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://127.0.0.1:8000/api/demande-prestation'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, message: string): Observable<any> {
    const payload = { to, subject, message };
    return this.http.post(this.apiUrl, payload);
  }
}
