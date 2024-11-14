import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CategoriePrestataireModel } from '../Models/categorieprestataire.model';
import { apiUrl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class CategorieService {
  private http = inject(HttpClient);



  //methodes pour récupérer toutes les categories
  getAllCategories() {
    // const token = localStorage.getItem('token');
    // const headers = { 'Authorization': `Bearer ${token}` };    
    return this.http.get(`${apiUrl}/categories`);
    
    // Méthodes pour lister les categories
  }
  getAllCategorie() {
    // const token = localStorage.getItem('token');
    // const headers = { 'Authorization': `Bearer ${token}` };    
    return this.http.get(`${apiUrl}/categories`);
    
    // Méthodes pour lister les categories
  }
}