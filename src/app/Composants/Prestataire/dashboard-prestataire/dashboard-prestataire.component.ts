import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { HeaderComponent } from '../../Commun/header/header.component';
import { CommentaireService } from '../../../Services/commentaire.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import Swal from 'sweetalert2';
import { PrestataireModel } from '../../../Models/prestataire.model';
import { CommentaireModel } from '../../../Models/commentaires.model';
import { PrestataireService } from '../../../Services/prestataire.service';

@Component({
  selector: 'app-dashboard-prestataire',
  standalone: true,
  imports: [NgFor, FormsModule, FooterComponent, HeaderComponent, NgIf],
  templateUrl: './dashboard-prestataire.component.html',
  styleUrl: './dashboard-prestataire.component.scss'
})
export class DashboardPrestataireComponent {
  private prestataireService = inject(PrestataireService);
  private commentaireService = inject(CommentaireService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  convertToInt(note: any): number {
    const parsedNote = parseInt(note, 10);
    console.log(`Note convertie: ${parsedNote}`); // Ajout d'un log pour déboguer
    return isNaN(parsedNote) ? 0 : parsedNote; // Retourne 0 si ce n'est pas un nombre
  }
  
  
  commentaireText: string = ''; // Variable pour stocker le texte du commentaire
  clientId: number = 1; // Remplacer par l'ID du client connecté (récupérer dynamiquement si nécessaire)
  prestataireId: number | undefined; // ID du prestataire, à assigner lors de l'initialisation
  prestataire: PrestataireModel | undefined; // Objet pour le prestataire
  commentaires: CommentaireModel[] = []; // Tableau pour les commentaires
  baseUrl: string = environment.apiurl;
  photoUrl: string = '';
  dateAjout: string = new Date().toISOString(); // Date d'ajout au format ISO
  rating: number = 1; // Stocker la note actuelle


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.prestataireId = id;
      this.getPrestataireDetails(id); // Récupérer les détails du prestataire
      this.getCommentaires(id); // Récupérer les commentaires associés au prestataire
    } else {
      console.error('Invalid prestataire ID');
    }
  }

  // Récupérer les détails du prestataire
  getPrestataireDetails(id: number): void {
    this.prestataireService.getPrestataire(id).subscribe(
      (response: any) => {
        this.prestataire = response.data;
        this.photoUrl = `${this.baseUrl}/${this.prestataire?.logo}`;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des détails du prestataire:', error);
      }
    );
  }
  // Méthode appelée lorsqu'une étoile est cliquée
  rate(stars: number): void {
    this.rating = stars; // Met à jour la note
  }

  // Récupérer les commentaires du prestataire
 // Récupérer les commentaires du prestataire
getCommentaires(id: number): void {
  this.commentaireService.getAllCommentaires(id).subscribe(
    (response: any) => {
      this.commentaires = response.data;
      console.log('Commentaires récupérés:', this.commentaires); // Vérifiez ici
    },
    (error: any) => {
      console.error('Erreur lors de la récupération des commentaires:', error);
    }
  );
}


  // Publier un commentaire
  publierCommentaire(): void {
    if (!this.prestataireId) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'ID du prestataire introuvable.',
      });
      return;
    }

    const nouveauCommentaire: CommentaireModel = {
      contenu: this.commentaireText,
      client_id: this.clientId,
      prestataire_id: this.prestataireId,
      note: this.rating, // Ajouter la note ici

    };
    // console.log('Note envoyée:', this.rating); // Log pour vérifier la note avant l'envoi

    this.commentaireService.addCommentaire(nouveauCommentaire).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Commentaire publié!',
          text: 'Votre commentaire a été publié avec succès.',
        });
        // Ajouter le nouveau commentaire au tableau local
        this.commentaires.push(nouveauCommentaire);
        // Réinitialiser le contenu du commentaire
        this.commentaireText = '';
        this.rating = 1; // Réinitialiser la note

      },
      (error) => {
        console.error('Erreur lors de la publication du commentaire:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la publication du commentaire.',
        });
      }
    );
  }

}