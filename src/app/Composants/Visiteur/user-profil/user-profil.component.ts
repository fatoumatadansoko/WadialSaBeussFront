import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { UserService } from '../../../Services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { UserModel } from '../../../Models/prestataire.model';
import { NgIf } from '@angular/common';
import { throwError, catchError } from 'rxjs';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,NgIf],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit{
  private userService = inject(UserService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  userId: number | undefined; // ID du prestataire, à assigner lors de l'initialisation
  baseUrl: string = environment.apiurl;
  photoUrl: string = '';
  user: UserModel = {};


  ngOnInit(): void {
   this.getUserProfile();
}
getUserProfile(): void {
    this.userService.getProfile().subscribe(
      response => {
        console.log('Données de profil utilisateur:', response);
        this.user = response.data; // Stocke les données utilisateur renvoyées par l'API
      },
      error => {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    );
    
  }
  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }

  // Récupérer les détails du prestataire
//   getPrestataireDetails(id: number): void {
//     this.prestataireService.getPrestataire(id).subscribe(
//       (response: any) => {
//         this.prestataire = response.data;
//         this.photoUrl = `${this.baseUrl}/${this.prestataire?.logo}`;
//       },
//       (error: any) => {
//         console.error('Erreur lors de la récupération des détails du prestataire:', error);
//       }
//     );
//   }
 // Afficher les informations de l'utilisateur connecté
//  getMe(id: number): void {
//   this.userService.getMe(id).pipe(
//       catchError(error => {
//           console.error('Erreur lors de la récupération de l\'utilisateur connecté:', error);
//           return throwError(error);
//       })
//   ).subscribe(
//       response => {
//           console.log('Réponse de l\'API:', response);
//           if (response && response.user) {
//               if (response.user !== null) {
//                   this.user = response.user;
//               } else {
//                   console.warn('Aucun utilisateur trouvé.');
//                   this.user = {
//                       nom: 'Utilisateur non trouvé',
//                       telephone: 'Non spécifié',
//                       email: 'Non spécifié',
//                       adresse: 'Non spécifié',
//                   };
//               }
//           } else {
//               console.warn('Données utilisateur manquantes dans la réponse');
//               this.user = {
//                   nom: 'Utilisateur inconnu',
//                   telephone: 'Non spécifié',
//                   email: 'Non spécifié',
//                   adresse: 'Non spécifié',
//               };
//           }
//       },
//       error => {
//           console.error('Erreur lors de la récupération de l\'utilisateur connecté:', error);
//       }
//   );
// }
}

  
// getUserDetails(id: number): void {
//   console.log('Tentative de récupération des détails de l\'utilisateur avec l\'ID:', id);
//   this.userService.getUser(id).subscribe(
//       (response: any) => {
//           console.log('User details response:', response); // Vérifie ce qui est reçu
//           if (response && response.data) {
//               this.user = response.data;
//               console.log('Utilisateur récupéré:', this.user);
//           } else {
//               console.warn('Aucune donnée utilisateur trouvée dans la réponse');
//           }
//       },
//       (error: any) => {
//           console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
//       }
//   );
// }



// }
