import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandeService } from '../../../Services/demande.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { HeaderComponent } from '../../Commun/header/header.component';
import { UserService } from '../../../Services/users.service';
import { Demande_PrestatairesService } from '../../../Services/demande_prestataires.service';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor, NgIf],
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss'] // Correction : 'styleUrls' au lieu de 'styleUrl'
})
export class DemandeListComponent implements OnInit {

  demandes: any[] = [];
  prestataire_id!: number; // Variable pour l'ID du prestataire
  user: any; // Variable pour stocker les infos de l'utilisateur connecté

  // Utilisation de l'injection avec la méthode 'inject' (Angular >= 16)
  private demandeService = inject(DemandeService);
  private userService = inject(UserService);
  private demandePrestatairesService = inject(Demande_PrestatairesService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté
    this.userService.getUserDetails().subscribe(
      (user) => {
        this.user = user;

        if (this.user.role === 'prestataire') {
          // Si l'utilisateur est un prestataire, récupérez son ID
          this.prestataire_id = this.user.prestataireId; // Utilisation de l'ID du prestataire depuis l'utilisateur

          // Appeler le service de demandes avec l'ID du prestataire
          this.getDemandes(this.prestataire_id);
        } else {
          console.error('L\'utilisateur n\'est pas un prestataire.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails utilisateur:', error);
      }
    );
  }

  getDemandes(prestataireId: number): void {
    this.demandeService.getDemandesForPrestataire(prestataireId).subscribe(
      (response) => {
        if (response.success) {
          this.demandes = response.demandes;
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes :', error);
      }
    );
  }
}
