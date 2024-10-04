import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { PretataireService } from '../../../Services/prestataire.service';
import { CategorieprestataireService } from '../../../Services/categorieprestataire.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { PrestataireModel } from '../../../Models/prestataire.model';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink,NgFor,CommonModule],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent {

  private PrestataireService = inject(PretataireService);    
  private categorieprestataireService = inject(CategorieprestataireService);
  private http = inject(HttpClient);

  // Déclaration des variables
  baseUrl: string = environment.apiurl
  prestataires: PrestataireModel[] = [];

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.fetchPrestataires();
  }


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
