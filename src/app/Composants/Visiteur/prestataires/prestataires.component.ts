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
import { PrestataireModel, UserModel } from '../../../Models/prestataire.model';
import { UserService } from '../../../Services/users.service';
import { CommentaireModel } from '../../../Models/commentaires.model';
import { PrestataireService } from '../../../Services/prestataire.service';
import { CommentaireService } from '../../../Services/commentaire.service';

@Component({
  selector: 'app-prestataires',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,NgFor,FormsModule,RouterLink,NgIf],
  templateUrl: './prestataires.component.html',
  styleUrls: ['./prestataires.component.scss']  // Correction : 'styleUrls' au lieu de 'styleUrl'
})
export class PrestatairesComponent implements OnInit {
  // Injection des dépendances
  private prestataireService = inject(PrestataireService);
  private categorieprestataireService = inject(CategorieprestataireService);
  private userService = inject(UserService);
  private http = inject(HttpClient);
  private commentaireService = inject(CommentaireService); // Injection du service de commentaires


  // Déclaration des variables
  baseUrl: string = environment.apiurl
  categoriesprestataires: CategoriePrestataireModel[] = [];
  commentaires: CommentaireModel[] = [];
  prestataires: PrestataireModel[] = [];
  users: UserModel[] = [];
  selectedCategorie: any = null;  
  message: string=''; 
      // La catégorie actuellement sélectionnée

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.fetchCategorieprestataires();
    this.fetchPrestataires();
    
    // Si tu veux récupérer les commentaires d'un prestataire particulier, assure-toi que le prestataire est bien défini
    if (this.prestataires.length > 0) {
      const prestataire = this.prestataires[0]; // Ex. : récupérer le premier prestataire
      this.getCommentaires(prestataire.id); // Passe l'id du prestataire ici
    }
  } 
  sortByRating(): void {
    this.prestataires.sort((a, b) => {
      const noteA = this.getAverageNoteForPrestataire(a.id); // Calculer la note moyenne de chaque prestataire
      const noteB = this.getAverageNoteForPrestataire(b.id);
      return noteB - noteA;
    });
  
    this.prestataires = [...this.prestataires]; // Actualiser la vue en déclenchant la détection de changements
  }
  
  getAverageNoteForPrestataire(prestataireId: number): number {
    const filteredCommentaires = this.commentaires.filter(comment => comment.prestataire_id === prestataireId);
    const totalNotes = filteredCommentaires.reduce((sum, comment) => sum + (comment.note || 0), 0);
    return filteredCommentaires.length > 0 ? totalNotes / filteredCommentaires.length : 0;
  }
  
  

  convertToInt(note: any): number {
    const parsedNote = parseInt(note, 10);
    return isNaN(parsedNote) ? 0 : parsedNote;
  }

  // Calcul de la note moyenne
  getAverageNote(prestataireId: number): number {
    const filteredCommentaires = this.commentaires.filter(comment => comment.prestataire_id === prestataireId);
    const totalNotes = filteredCommentaires.reduce((sum, comment) => sum + this.convertToInt(comment.note), 0);
    return filteredCommentaires.length > 0 ? totalNotes / filteredCommentaires.length : 0;
  }

  getCommentaires(id: number): void {
    this.commentaireService.getAllCommentaires(id).subscribe(
      (response: any) => {
        this.commentaires = Array.isArray(response) ? response : [response];
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    );
  }//écupération de toutes les catégories des prestataires
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
    this.prestataires =[];
    this.prestataireService.getPrestatairesByCategory(categoryId).subscribe(
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
    this.prestataireService.getAllPrestataire().subscribe(
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