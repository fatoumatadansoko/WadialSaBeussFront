import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CategoriePrestataireModel } from '../Models/categorieprestataire.model';
import { apiurl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class CategorieprestataireService {
  private http = inject(HttpClient);



  //methodes pour récupérer toutes les categories
  getAllCategorieprestataire(categoryId?: number) {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${apiurl}/categoriesprestataires`, { headers });
    
    // Méthodes pour lister les categories
  }}