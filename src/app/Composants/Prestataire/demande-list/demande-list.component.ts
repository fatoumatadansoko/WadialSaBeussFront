import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandeService } from '../../../Services/demande.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { HeaderComponent } from '../../Commun/header/header.component';
import { UserService } from '../../../Services/users.service';
import { DemandePrestationService } from '../../../Services/demandePrestation.service';
import { PrestataireService } from '../../../Services/prestataire.service';
import { environment } from '../../../../environnements/environments';
import { UserModel } from '../../../Models/prestataire.model';
import { DemandePrestation } from '../../../Models/demande_prestataires.model';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor, NgIf,ReactiveFormsModule,CommonModule],
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss'] // Correction : 'styleUrls' au lieu de 'styleUrl'
})
export class DemandeListComponent implements OnInit {
  prestataire: any; // Variable pour stocker les infos du prestataire connecté
  demandes: DemandePrestation[] = [];
  prestataire_id!: number; // Variable pour l'ID du prestataire
  user: any; // Variable pour stocker les infos de l'utilisateur connecté
  baseUrl: string = environment.apiurl;
  users: any[] = []; // Initialisez comme tableau vide
  // Utilisation de l'injection avec la méthode 'inject' (Angular >= 16)
  private demandeService = inject(DemandeService);
  private userService = inject(UserService);
  private demandePrestationService = inject(DemandePrestationService);
  private route = inject(ActivatedRoute);
  private prestataireService = inject(PrestataireService);

  ngOnInit(): void {
    this.loadPrestataireDemandes(); // Charge les demandes du prestataire connecté
    this.fetchUsers();
    

  }



 
  loadPrestataireDemandes(): void {
    const prestataire = localStorage.getItem('prestataire');

    if (prestataire) {
        const prestataireId = JSON.parse(prestataire).id;

        this.demandePrestationService.getDemandesByPrestataireId(prestataireId).subscribe(
            (response: any) => {
                if (response) {
                    this.demandes = response.prestataire.demandes;

                    // Associating user names with the demandes
                    this.demandes.forEach(demande => {
                        const client = this.users.find(user => user.id === demande.user_id);
                        if (client) {
                            demande.clientNom = client.nom; // Assign the client's name
                        } else {
                            demande.clientNom = 'Nom inconnu'; // Handle case where user isn't found
                        }
                    });

                    console.log('Demandes avec noms de clients:', this.demandes);

                } else {
                    console.error(response.message);
                }
            },
            (error) => {
                console.error('Erreur lors de la récupération des demandes', error);
            }
        );
    } else {
        console.error('Prestataire non trouvé dans le localStorage');
    }
}


  getUserProfile(): void {
    const prestataire = localStorage.getItem('prestataire');
  
    if (prestataire) {
        const prestataireId = JSON.parse(prestataire).id; // Récupère l'ID du client
      console.log(prestataireId);
    }
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
    

   fetchUsers(): void {
    this.userService.getAllUser().subscribe(
      (response: any) => {
        console.log('Réponse complète:', response); // Vérifiez ici la structure
        if (response && Array.isArray(response)) {
          this.users = response.reverse(); // Assurez-vous d'utiliser la structure correcte
          console.log('Utilisateurs:', this.users); // Vérifiez si les utilisateurs sont bien affectés
        } else {
          console.error('Erreur: la réponse ne contient pas de données utilisateur');
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }
}
