import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
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
    return this.http.get(`${apiUrl}/prestataires`);
  }
    // Afficher les details d'un seul user
    getPrestataire(id: number): Observable<any> {
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
        return this.http.post(`${apiUrl}/register`, user);
    
  }
  demanderPrestation(demande: { prestataire_id: number; message: string }): Observable<any> {
    return this.http.post(`${apiUrl}/demande-prestation`, demande);
  
  }
 
   // Méthode pour récupérer les demandes d'un prestataire
  
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
  // getPrestatairesByRating(): Observable<any> {
  //   return this.http.get(`${apiUrl}/prestataires/byrating`);
  // }
 }
