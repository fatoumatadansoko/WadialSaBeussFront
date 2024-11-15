import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { error } from 'console';
import { environment } from '../../environnements/environments';
import { apiUrl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class DemandePrestationService {
  private baseUrl: string = environment.apiurl;

    private http = inject(HttpClient);

 // Methode pour recuperer toutes les prestataires 


 getDemandesByPrestataireId(prestataireId: number): Observable<any> {
  // const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur
  // const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

<<<<<<< HEAD
  return this.http.get(`${apiUrl}/prestataires/${prestataireId}/demandes`);
=======
  return this.http.get(`${apiurl}/prestataires/${prestataireId}/demandes`);
>>>>>>> origin/develop
}
getUsers(): Observable<any> {
  // const token = localStorage.getItem('auth_token');
  // const headers = { 'Authorization': `Bearer ${token}` };

<<<<<<< HEAD
  return this.http.get(`${apiUrl}/users}`);
=======
  return this.http.get('http://127.0.0.1:8000/api/users');
>>>>>>> origin/develop
}
}