import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { apiurl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class CommentaireService {
  private http = inject(HttpClient);



  //methodes pour récupérer toutes les commentaires
  getAllCommentaieres() {
    return this.http.get(`${apiurl}/commentaites`);
    
    // Méthodes pour lister les cartes
  }}