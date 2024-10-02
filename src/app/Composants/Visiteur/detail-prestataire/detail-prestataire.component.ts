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
import { PretataireService } from '../../../Services/prestataire.service';
import { PrestataireModel } from '../../../Models/prestataire.model';

@Component({
  selector: 'app-detail-prestataire',
  standalone: true,
  imports: [NgFor, FormsModule, FooterComponent, HeaderComponent, NgIf],
  templateUrl: './detail-prestataire.component.html',
  styleUrls: ['./detail-prestataire.component.scss']
})


export class DetailPrestataireComponent implements OnInit {

  private prestataireService = inject(PretataireService); 
  private route: ActivatedRoute = inject(ActivatedRoute);

  prestataire: PrestataireModel | undefined; // Doit être un objet, pas un tableau
  commentaires: CommentaireModel[] = []; // Doit être un tableau, pas un objet
   user: UserModel | undefined;
  baseUrl: string = environment.apiurl;
  photoUrl: string = '';
  

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('Invalid ID parameter');
      return;
    }
    this.getPrestataireDetails(id); // Récupérer les détails du prestataire
  }

  getPrestataireDetails(id: number): void {
    this.prestataireService.getPrestataire(id).subscribe(
      (response: any) => {
        console.log('Response from API:', response); // Vérifier la réponse complète
        this.prestataire = response.data; // Assigner la réponse à `prestataire`
        this.user = this.prestataire?.user; // Si prestataire existe, assigner l'utilisateur
        this.photoUrl = `${this.baseUrl}/${this.prestataire?.logo}`; // Générer l'URL de l'image
        console.log('Prestataire:', this.prestataire); // Vérifier la valeur de `prestataire`
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des détails du prestataire:', error);
      }
    );
  }
  
}