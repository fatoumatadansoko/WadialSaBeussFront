import { Component, inject, OnInit, Injectable } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { NgFor } from '@angular/common';
import { CategoriePrestataireModel } from '../../../Models/categorieprestataire.model';
import { response } from 'express';
import { CategorieprestataireService } from '../../../Services/categorieprestataire.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategorieModel } from '../../../Models/categorie.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-prestataires',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,NgFor,FormsModule,RouterLink],
  templateUrl: './prestataires.component.html',
  styleUrl: './prestataires.component.scss'
})
export class PrestatairesComponent implements OnInit {
  // Injection des dépendances
  private categorieprestataireService = inject(CategorieprestataireService);
  private http = inject(HttpClient);

  // Déclaration des variables
  categoriesprestataires: CategoriePrestataireModel[] = [];
  categories: CategorieModel[] = [];

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.fetchCategorieprestataires();
    this.fetchCategories();
  }

  // Récupération de toutes les catégories des prestataires
  fetchCategorieprestataires(): void {
    this.categorieprestataireService.getAllCategorieprestataire().subscribe(
      (response: any) => {
        console.log(response.data);
        // Suppression des doublons en fonction du titre et de la description
        this.categoriesprestataires = response.data
          .reverse()
          .filter((value: { titre: any; description: any; }, index: any, self: any[]) =>
            index === self.findIndex((t) => (
              t.titre === value.titre && t.description === value.description
            ))
          );
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories de prestataires', error);
      }
    );
  }

  // Récupération de toutes les catégories
  fetchCategories(): void {
    const token = localStorage.getItem('auth_token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get('http://127.0.0.1:8000/api/categoriesprestataires', { headers }).subscribe(
      (response: any) => {
        console.log(response.data);
        this.categories = response.data.reverse();
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  // Cette méthode retourne un Observable pour les catégories des prestataires
  getCategoriesPrestataires(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get('http://127.0.0.1:8000/api/categoriesprestataires', { headers });
  }

  // Cette méthode retourne un Observable pour les catégories
  getCategories(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = { 'Authorization': `Bearer ${token}` };

    return this.http.get('http://127.0.0.1:8000/api/categories', { headers });
  }
}