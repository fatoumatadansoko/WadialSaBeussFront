import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { error } from 'console';
import { environment } from '../../environnements/environments';
import { apiUrl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class PrestataireService {
  private baseUrl: string = environment.apiurl;

    private http = inject(HttpClient);

 // Methode pour recuperer toutes les prestataires 

  constructor(private htttp: HttpClient) {}

  getAllPrestataire(): Observable<any> {
    // const token = localStorage.getItem('token');
    // const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>(`${apiUrl}/prestataires`);
  }
    // Afficher les details d'un seul user
    getPrestataire(id: number): Observable<any> {
      // const token = localStorage.getItem('token');
      
      // if (!token) {
      //   console.error('No authentication token found');
      //   return throwError('No authentication token found');
      // }
    
      // const headers = new HttpHeaders({
      //   'Authorization': `Bearer ${token}`
      // });
    
      return this.http.get<any>(`${apiUrl}/prestataires/${id}`).pipe(
        catchError((error) => {
          console.error('Failed to fetch user details:', error);
          return throwError(error);
        })
      );
    }
     // Méthode existante pour récupérer toutes les catégories
  getAllCategorieprestataire(): Observable<any> {
    return this.http.get(`${apiUrl}/prestataires/categoriesprestataires`);
  }
   
    getPrestatairesByCategory(categoryId: number): Observable<any> {
      return this.http.get(`${apiUrl}/prestataires/category/${categoryId}`);
  }
  
   // Méthode pour inscrire un utilisateur (prestataire ou client)
  register(user: any): Observable<any> {
        return this.http.post(`${apiUrl}/prestataires/register`, user);
    
  }
  demanderPrestation(demande: { prestataire_id: number; message: string }): Observable<any> {
    // const token = localStorage.getItem('token');
    // const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${apiUrl}/prestataires/demande-prestation`, demande);
  
  }
  getTopRatedPrestataires(): Observable<any> {
    return this.http.get('/api/prestataires/top-rated');
  }
   // Méthode pour récupérer les demandes d'un prestataire
  
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }

 }
