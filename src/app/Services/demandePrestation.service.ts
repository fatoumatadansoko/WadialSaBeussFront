import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { apiurl } from './ApiUrl';
import { error } from 'console';
import { environment } from '../../environnements/environments';


@Injectable({
    providedIn: 'root'
})
export class DemandePrestationService {
  private apiUrl = 'http://127.0.0.1:8000/api/prestataires'; // Remplacez par l'URL de votre API
  private baseUrl: string = environment.apiurl;

    private http = inject(HttpClient);

 // Methode pour recuperer toutes les prestataires 


 getDemandesByPrestataireId(prestataireId: number): Observable<any> {
  // const token = localStorage.getItem('token'); // Récupère le token de l'utilisateur
  // const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  return this.http.get(`${apiurl}/prestataires/${prestataireId}/demandes`);
}
getUsers(): Observable<any> {
  // const token = localStorage.getItem('auth_token');
  // const headers = { 'Authorization': `Bearer ${token}` };

  return this.http.get('http://127.0.0.1:8000/api/users');
}
}