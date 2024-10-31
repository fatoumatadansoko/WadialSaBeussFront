import { Component, Inject, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../Commun/footer/footer.component";
import { HeaderComponent } from "../../Commun/header/header.component";
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../../Models/users.model';
import { CommentaireModel } from '../../../Models/commentaires.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,RouterLink,RouterModule } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { CategorieprestataireService } from '../../../Services/categorieprestataire.service';
import { UserService } from '../../../Services/users.service';
import { PrestataireModel } from '../../../Models/prestataire.model';
import { CommentaireService } from '../../../Services/commentaire.service';
import Swal from 'sweetalert2';
import { EmailService } from '../../../email.service';
import { PrestataireService } from '../../../Services/prestataire.service';

@Component({
  selector: 'app-detail-prestataire',
  standalone: true,
  imports: [NgFor, FormsModule, FooterComponent, HeaderComponent, NgIf],
  templateUrl: './detailprestataire.component.html',
  styleUrls: ['./detailprestataire.component.scss']
})


export class DetailPrestataireComponent implements OnInit {

  private prestataireService = inject(PrestataireService);
  private commentaireService = inject(CommentaireService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  constructor(private emailService: EmailService) { }

  convertToInt(note: any): number {
    const parsedNote = parseInt(note, 10);
    // console.log(`Note convertie: ${parsedNote}`); 
    return isNaN(parsedNote) ? 0 : parsedNote; // Retourne 0 si ce n'est pas un nombre
  }
  
  
  commentaireText: string = ''; // Variable pour stocker le texte du commentaire
  clientId: number = 1; // Remplacer par l'ID du client connecté (récupérer dynamiquement si nécessaire)
  prestataireId: number | undefined; // ID du prestataire, à assigner lors de l'initialisation
  prestataire: PrestataireModel | undefined; // Objet pour le prestataire
  commentaires: CommentaireModel[] = []; // Initialisation comme tableau
  isRequestingPrestation: boolean = false;
  baseUrl: string = environment.apiurl;
  photoUrl: string = '';
  dateAjout: string = new Date().toISOString(); // Date d'ajout au format ISO
  rating: number = 1; // Stocker la note actuelle


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.prestataireId = id;
      this.getPrestataireDetails(id); // Récupérer les détails du prestataire
      this.getCommentaires(id); // Appel de la méthode pour récupérer les commentaires
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
 getCommentaires(id: number): void {
  this.commentaireService.getAllCommentaires(id).subscribe(
    (response: any) => {
      console.log('Réponse complète:', response);
      this.commentaires = Array.isArray(response) ? response : [response];
      console.log('Commentaires récupérés:', this.commentaires);
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
      note: this.rating, 


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
        this.commentaires.push(response.data); // Modifié ici
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
  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
  demanderPrestation(): void {
    // Vérifier si une demande est déjà en cours
    if (this.isRequestingPrestation) {
      return;
    }
  
    if (!this.prestataireId) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'ID du prestataire introuvable.',
      });
      return;
    }
  
    this.isRequestingPrestation = true; // Activer le loader
  
    const message = `Bonjour,\n\nJe souhaite demander une prestation auprès de ${this.prestataire?.user?.nom}.\n\nMerci!`;
    
    const demande = {
      prestataire_id: this.prestataireId,
      message: message,
    };
  
    this.prestataireService.demanderPrestation(demande).subscribe(
      response => {
        console.log('Demande de prestation envoyée avec succès:', response);
        Swal.fire({
          icon: 'success',
          title: 'Demande envoyée!',
          text: 'Votre demande de prestation a été envoyée avec succès.',
        });
      },
      error => {
        console.error('Erreur lors de l\'envoi de la demande de prestation:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'envoi de votre demande.',
        });
      }
    ).add(() => {
      this.isRequestingPrestation = false; // Désactiver le loader dans tous les cas
    });
  }

}