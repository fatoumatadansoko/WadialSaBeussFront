import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CategoriePrestataireModel } from '../Models/categorieprestataire.model';
import { apiurl } from './ApiUrl';


@Injectable({
    providedIn: 'root'
})
export class CategorieprestataireService {
    constructor(private http: HttpClient) {}
    getCategoriesPrestataires():Observable<{data:CategoriePrestataireModel[]}> {
        return this.http.get<{ data: CategoriePrestataireModel[] }>(`${apiurl}categoriesprestataires`);
        }


    // Méthodes pour lister les categories
    getCategoriesEvenements(): Observable<{ message: string, data: CategoriePrestataireModel[] }> {
        return this.http.get<{ message: string, data: CategoriePrestataireModel[] }>(`${apiurl}categories`);
    }

    // Methode pour afficher les details d'une categorie
    getCategorie(id: number): Observable<any> {
        return this.http.get(`${apiurl}categories/${id}`);
    }
}
