import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CategoriePrestataireModel } from '../Models/categorieprestataire.model';
import { apiurl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class CategorieprestataireService {
    cateoriesprestataires: any[]=[];
    categoriesprestataires: any;

    constructor(private http: HttpClient) {}
ngOnit(): void {
    this.getCategoriesprestataires();
}

    // Méthodes pour lister les categories
    getCategoriesprestataires(){
        const token = localStorage.getItem('auth_token'); // Récupérer le token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://127.0.0.1:8000/api/categoriesprestataires', { headers })
      .subscribe(
        (response: any) => {
          this.categoriesprestataires = response;
          console.log(this.categoriesprestataires);
        },
        (error) => {
          console.error('Erreur lors du chargement des catégories:', error);
        }
      );

    }}
