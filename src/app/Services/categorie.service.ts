import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CategoriePrestataireModel } from '../Models/categorieprestataire.model';
import { apiurl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class CategorieService {
  private http = inject(HttpClient);



  //methodes pour récupérer toutes les categories
  getAllCategorie() {
    return this.http.get(`${apiurl}/categories`);
    
    // Méthodes pour lister les categories
  }}