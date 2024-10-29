// cartepersonnalisee.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './ApiUrl';

@Injectable({
  providedIn: 'root'
})

export class InviteService {

  private http = inject(HttpClient);

  constructor(private htttp: HttpClient) {}
 
  getInvites(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    return this.http.get(`${apiUrl}/cartes-personnalisees/${id}/invites`, { headers });
  }
}
  

