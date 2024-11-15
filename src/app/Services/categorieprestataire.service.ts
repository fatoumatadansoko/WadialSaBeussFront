import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CategoriePrestataireModel } from '../Models/categorieprestataire.model';
import { apiUrl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class CategorieprestataireService {
  private http = inject(HttpClient);



  //methodes pour récupérer toutes les categories
  getAllCategorieprestataire(categoryId?: number) {
    // const token = localStorage.getItem('token');
    // const headers = { 'Authorization': `Bearer ${token}` };
<<<<<<< HEAD
    return this.http.get(`${apiUrl}/categoriesprestataires`);
=======
    return this.http.get(`${apiurl}/categoriesprestataires`);
>>>>>>> origin/develop
    
    // Méthodes pour lister les categories
  }}