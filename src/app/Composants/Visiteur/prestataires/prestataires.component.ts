import { Component, inject, OnInit, Injectable } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { NgFor, NgIf } from '@angular/common';
import { CategoriePrestataireModel } from '../../../Models/categorieprestataire.model';
import { response } from 'express';
import { CategorieprestataireService } from '../../../Services/categorieprestataire.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategorieModel } from '../../../Models/categorie.model';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { PretataireService } from '../../../Services/prestataire.service';
import { PrestataireModel } from '../../../Models/prestataire.model';

@Component({
  selector: 'app-prestataires',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,NgFor,FormsModule,RouterLink,NgIf],
  templateUrl: './prestataires.component.html',
  styleUrl: './prestataires.component.scss'
})
export class PrestatairesComponent implements OnInit {
  // Injection des dépendances
  private PrestataireService = inject(PretataireService);    
  private categorieprestataireService = inject(CategorieprestataireService);
  private http = inject(HttpClient);

  // Déclaration des variables
  baseUrl: string = environment.apiurl
  categoriesprestataires: CategoriePrestataireModel[] = [];
  prestataires: PrestataireModel[] = [];

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.fetchCategorieprestataires();
    this.fetchPrestataires();
  }

  // Récupération de toutes les catégories des prestataires
  fetchCategorieprestataires(): void {
    const authToken = localStorage.getItem('token');  // Ou tout autre mécanisme de stockage du token
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
  fetchPrestataires(): void {
    this.PrestataireService.getAllPrestataire().subscribe(
      (response: any) => {
        console.log('Réponse complète:', response); // Vérifiez ici la structure
        if (response && Array.isArray(response)) {
          // Filtrer les utilisateurs par rôle
          this.prestataires = response
            .reverse(); // Inverser l'ordre si nécessaire
            
          console.log('Prestataires:', this.prestataires); // Vérifiez si les prestataires sont bien affectés
        } else {
          console.error('Erreur: la réponse ne contient pas de données utilisateur');
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }
  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
  
}