import { Component, OnInit, inject } from '@angular/core';
import { DemandeService } from '../../../Services/demande.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { HeaderComponent } from '../../Commun/header/header.component';
import { UserService } from '../../../Services/users.service';
import { DemandePrestationService } from '../../../Services/demandePrestation.service';
import { environment } from '../../../../environnements/environments';
import { DemandePrestation, EtatDemande } from '../../../Models/demande_prestataires.model';
import Swal from 'sweetalert2';

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
  isApprovingMap: Map<number, boolean> = new Map(); // Pour suivre l'état de chargement par demande
  isRejectingMap: Map<number, boolean> = new Map();
  // Utilisation de l'injection avec la méthode 'inject' (Angular >= 16)
  private demandeService = inject(DemandeService);
  private userService = inject(UserService);
  private demandePrestationService = inject(DemandePrestationService);

  ngOnInit(): void {
    this.loadPrestataireDemandes(); // Charge les demandes du prestataire connecté
    this.fetchUsers();
    

  }

 
  loadPrestataireDemandes(): void {
    const prestataire = localStorage.getItem('prestataire');
  
    if (prestataire) {
      const prestataireId = JSON.parse(prestataire).id;
  
      this.demandePrestationService.getDemandesByPrestataireId(prestataireId).subscribe(
        (response) => {
          if (response.success) {
            this.demandes = response.prestataire.demandes;
  
            this.demandes.forEach(demande => {
              demande.clientNom = demande.client ? demande.client.nom : 'Nom inconnu';
              
              // Vérifier l'état stocké dans le localStorage pour désactiver le bouton
              const savedEtat = localStorage.getItem(`demande_${demande.id}_etat`);
              if (savedEtat && savedEtat !== 'en_attente') {
                demande.etat = savedEtat as EtatDemande;
              }
            });
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
    // if (typeof window !== 'undefined' && localStorage.getItem('prestataire')) {
    const prestataire = localStorage.getItem('prestataire');
    // const prestataire = JSON.parse(typeof window !== 'undefined' && localStorage.getItem('prestataire') || "{}");
    
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
  approuverDemande(demandeId: number): void {
    this.isApprovingMap.set(demandeId, true); 
    
    this.demandeService.approuverDemande(demandeId).subscribe(
      (response) => {
        if (response.success) {
          const demande = this.demandes.find(d => d.id === demandeId);
          if (demande) {
            demande.etat = EtatDemande.APPROUVE;
            localStorage.setItem(`demande_${demandeId}_etat`, EtatDemande.APPROUVE); // Sauvegarder l'état
            Swal.fire({
              title: 'Demande approuvée!',
              text: 'La demande a été approuvée avec succès.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      },
      error => {
        console.error('Erreur lors de l\'approbation de la demande:', error);
      }
    ).add(() => {
      this.isApprovingMap.set(demandeId, false); 
    });
  }
  
  refuserDemande(demandeId: number): void {
    this.isRejectingMap.set(demandeId, true); 
    
    this.demandeService.refuserDemande(demandeId).subscribe(
      (response) => {
        if (response.success) {
          const demande = this.demandes.find(d => d.id === demandeId);
          if (demande) {
            demande.etat = EtatDemande.REJETE;
            localStorage.setItem(`demande_${demandeId}_etat`, EtatDemande.REJETE); // Sauvegarder l'état
            Swal.fire({
              title: 'Demande rejetée!',
              text: 'La demande a été refusée avec succès.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      },
      error => {
        console.error('Erreur lors du rejet de la demande:', error);
      }
    ).add(() => {
      this.isRejectingMap.set(demandeId, false); 
    });
  }
  
}
