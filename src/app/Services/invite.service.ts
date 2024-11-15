// cartepersonnalisee.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './ApiUrl';

@Injectable({
  providedIn: 'root'
})

export class InviteService {

  private http = inject(HttpClient);

  constructor(private htttp: HttpClient) {}
 
  getInvites(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/cartes-personnalisees/${id}/invites`);
  }
}
  