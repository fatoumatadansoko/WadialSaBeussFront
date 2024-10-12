import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { PretataireService } from '../../../Services/prestataire.service';
import { CategorieprestataireService } from '../../../Services/categorieprestataire.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { PrestataireModel, UserModel } from '../../../Models/prestataire.model';
import { UserService } from '../../../Services/users.service';

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

  private userService = inject(UserService);


  // Déclaration des variables
  baseUrl: string = environment.apiurl
  prestataires: PrestataireModel[] = [];
  users: UserModel[] = [];


  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.fetchPrestataires();
  }


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
