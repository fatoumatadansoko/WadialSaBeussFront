import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { UserService } from '../../../Services/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { UserModel } from '../../../Models/prestataire.model';
import { CommonModule, NgIf } from '@angular/common';
import { catchError } from 'rxjs';
import { SidebarComponent } from "../../Commun/sidebar/sidebar.component";

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgIf, CommonModule, RouterLink, SidebarComponent],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit {
  private userService = inject(UserService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public prestataireId?: number;
  userId: number | undefined;
  baseUrl: string = environment.apiurl;
  photoUrl: string = '';
  user: UserModel = {};
  userRole: string | undefined;

  ngOnInit(): void {
    // Attendre que les deux opérations soient terminées
    Promise.all([
      this.getUserProfile(),
      this.getUserRole()
    ]).catch(error => {
      console.error('Erreur lors de l\'initialisation:', error);
    });
  }

  getUserProfile(): Promise<void> {
    return new Promise((resolve, reject) => {
      const prestataire = localStorage.getItem('prestataire');
      
      if (prestataire) {
        try {
          const prestataireData = JSON.parse(prestataire);
          this.prestataireId = prestataireData.id;
          console.log('ID du prestataire:', this.prestataireId);
        } catch (error) {
          console.error('Erreur lors du parsing des données prestataire:', error);
        }
      }

      this.userService.getProfile().pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des informations utilisateur:', error);
          reject(error);
          throw error;
        })
      ).subscribe({
        next: (response) => {
          if (response && response.data) {
            console.log('Données de profil utilisateur:', response);
            this.user = response.data;
            resolve();
          } else {
            reject('Données de réponse invalides');
          }
        },
        error: (error) => reject(error)
      });
    });
  }

  getUserRole(): Promise<void> {
    return new Promise((resolve) => {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          this.userRole = parsedUser?.roles?.[0]?.name;
          console.log('Rôle utilisateur:', this.userRole);
        } catch (error) {
          console.error('Erreur lors du parsing des données utilisateur:', error);
        }
      }
      resolve();
    });
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
}