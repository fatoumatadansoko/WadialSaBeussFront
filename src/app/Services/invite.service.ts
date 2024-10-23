// cartepersonnalisee.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiurl } from './ApiUrl';

@Injectable({
  providedIn: 'root'
})

export class InviteService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Remplacez par l'URL de votre API

  private http = inject(HttpClient);

  constructor(private htttp: HttpClient) {}
 
  getInvites(id: number): Observable<any> {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    return this.http.get(`${apiurl}/cartes-personnalisees/${id}/invites`);
  }
}
  

