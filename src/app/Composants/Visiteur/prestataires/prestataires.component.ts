import { Component, inject, OnInit, Injectable } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { NgFor, NgIf } from '@angular/common';
import { CategoriePrestataireModel } from '../../../Models/categorieprestataire.model';
import { CategorieprestataireService } from '../../../Services/categorieprestataire.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategorieModel } from '../../../Models/categorie.model';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { PretataireService } from '../../../Services/prestataire.service';
import { PrestataireModel, UserModel } from '../../../Models/prestataire.model';
import { UserService } from '../../../Services/users.service';

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
  private userService = inject(UserService);
  private http = inject(HttpClient);

  // Déclaration des variables
  baseUrl: string = environment.apiurl
  categoriesprestataires: CategoriePrestataireModel[] = [];
  prestataires: PrestataireModel[] = [];
  users: UserModel[] = [];
  selectedCategorie: any = null;  
  message: string=''; 
      // La catégorie actuellement sélectionnée

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
  onCategorieSelect(categorie: any): void {
    this.selectedCategorie = categorie;
    this.filterPrestatairesByCategory(categorie.id); // Filtrage des prestataires par catégorie
  }
  
  //Filtrer les prestataires par catégorie
  filterPrestatairesByCategory(categoryId: number): void {
    this.PrestataireService.getPrestatairesByCategory(categoryId).subscribe(
      (response: any) => {
        this.prestataires = response.data; // Mettez à jour la liste des prestataires
  
        if (this.prestataires.length === 0) {
          // Aucune donnée trouvée
          this.message = `Aucun prestataire trouvé pour cette catégorie.`;
        } else {
          // Réinitialiser le message si des prestataires sont trouvés
          this.message = '';
        }
  
        console.log('Prestataires filtrés:', this.prestataires); // Pour déboguer
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des prestataires par catégorie', error);
  
        // Gestion des erreurs
        if (error.status === 404) {
          this.message = `Erreur 404 : Aucun prestataire trouvé pour cette catégorie.`;
        } else {
          this.message = `Erreur lors de la récupération des prestataires. Veuillez réessayer plus tard.`;
        }
      }
    );
  }
  
  // Récupération de toutes les prestataires
  fetchPrestataires(): void {
    this.PrestataireService.getAllPrestataire().subscribe(
      (prestataires: PrestataireModel[]) => {
        this.userService.getAllUser().subscribe(
          (users: UserModel[]) => {
            // Pour chaque prestataire, associer l'utilisateur en fonction de l'user_id
            prestataires.forEach(prestataire => {
              prestataire.user = users.find(user => user.id === prestataire.user_id);
            });
            
            this.prestataires = prestataires.reverse(); // Inverser l'ordre pour avoir les plus récents en premier
          }
        );
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des prestataires:', error);
      }
    );
  }
  
  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
  
}