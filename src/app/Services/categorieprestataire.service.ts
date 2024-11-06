import { Injectable, inject,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(`${apiUrl}/categoriesprestataires`);
    
  }}