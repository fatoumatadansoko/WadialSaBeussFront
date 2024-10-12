import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { apiurl } from './ApiUrl';
import { CommentaireModel } from '../Models/prestataire.model';


@Injectable({
    providedIn: 'root'
})
export class CommentaireService {
  private http = inject(HttpClient);



  //methodes pour récupérer toutes les commentaires
  getAllCommentaires(id?: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${apiurl}/commentaires/prestataire/${id}`, { headers });

  }
  
    // Methode ajouter un commentaire // Méthode pour ajouter un commentaire
  addCommentaire(commentaire: CommentaireModel): Observable<any> {
    const token = localStorage.getItem('token'); // Remplacez par la méthode d'obtention de votre token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajoutez l'en-tête d'autorisation
    });

    // Envoie le corps de la requête avec le commentaire
    return this.http.post(`${apiurl}/commentaires`, commentaire, { headers });
  }
}