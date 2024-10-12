import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { apiurl } from './ApiUrl';
import { error } from 'console';
import { environment } from '../../environnements/environments';


@Injectable({
    providedIn: 'root'
})
export class PretataireService {
  private apiUrl = 'http://127.0.0.1:8000/api/prestataires'; // Remplacez par l'URL de votre API
  private baseUrl: string = environment.apiurl;

    private http = inject(HttpClient);

 // Methode pour recuperer toutes les prestataires 

  constructor(private htttp: HttpClient) {}

  getAllPrestataire(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(this.apiUrl, { headers });
  }
    // Afficher les details d'un seul user
    getPrestataire(id: number): Observable<any> {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No authentication token found');
        return throwError('No authentication token found');
      }
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      return this.http.get<any>(`${apiurl}/prestataires/${id}`, { headers }).pipe(
        catchError((error) => {
          console.error('Failed to fetch user details:', error);
          return throwError(error);
        })
      );
    }
     // Méthode existante pour récupérer toutes les catégories
  getAllCategorieprestataire(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categoriesprestataires`);
  }
   
    getPrestatairesByCategory(categoryId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/category/${categoryId}`);
  }
  
   // Méthode pour inscrire un utilisateur (prestataire ou client)
  register(user: any): Observable<any> {
        return this.http.post(`${apiurl}/register`, user);
    
  }
  demanderPrestation(demande: { prestataire_id: number; message: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${apiurl}/demande-prestation`, demande,{ headers });
  
  }
   // Méthode pour récupérer les demandes d'un prestataire
  
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }

 }
