import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Demande_PrestatairesService } from '../../Services/demande_prestataires.service';
import { UserService } from '../../Services/users.service';

@Component({
  selector: 'app-demande-lists',
  standalone: true,
  imports: [NgIf,RouterLink, NgFor, CommonModule],
  templateUrl: './demande-lists.component.html',
  styleUrls: ['./demande-lists.component.scss'] // Correction ici
})
export class DemandeListsComponent {
  private DemandePrestataire = inject(Demande_PrestatairesService);    
  private userService = inject(UserService);
  private http = inject(HttpClient);
  public demandeprestataires: any[] = [];

  prestataireId: number = 0; // Initialisation

  constructor(private route: ActivatedRoute) {} // Retirer HttpClient ici
  ngOnInit(): void {
    this.route.params.subscribe(params => { // Utiliser subscribe pour récupérer les paramètres
      this.prestataireId = +params['prestataireId']; // Convertir en nombre
      this.loadDemandes();
    });
  }

  loadDemandes(): void {
    this.DemandePrestataire.getDemandesForPrestataire(this.prestataireId).subscribe({
      next: (response) => {
        this.demandeprestataires = response.prestataire.demandes; // Adaptez en fonction de la réponse de votre API
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des demandes:', error);
      }
    });
  }

}
