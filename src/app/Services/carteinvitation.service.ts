import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { apiurl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class CarteinvitationService {
  private http = inject(HttpClient);



  //methodes pour récupérer toutes les cartes
  getAllCarteinvitations() {
    return this.http.get(`${apiurl}/cartes`);
    
    // Méthodes pour lister les cartes
  }}