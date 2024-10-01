import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../Commun/footer/footer.component";
import { HeaderComponent } from "../../Commun/header/header.component";
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../../Models/users.model';
import { CommentaireModel } from '../../../Models/commentaires.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { CategorieprestataireService } from '../../../Services/categorieprestataire.service';
import { UserService } from '../../../Services/users.service';

@Component({
  selector: 'app-detail-prestataire',
  standalone: true,
  imports: [NgFor, FormsModule, FooterComponent, HeaderComponent, NgIf],
  templateUrl: './detail-prestataire.component.html',
  styleUrls: ['./detail-prestataire.component.scss']
})
export class DetailPrestataireComponent implements OnInit {
  prestataire: UserModel | null = null; // Pour stocker le prestataire sélectionné

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getPrestataireDetails(); // Appeler la méthode pour récupérer les détails du prestataire
  }

  getPrestataireDetails(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID du routeur
    if (id) {
      this.userService.getUser(+id).subscribe(
        (response: UserModel) => {
          this.prestataire = response; // Assigner la réponse au prestataire
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du prestataire:', error);
        }
      );
    }
  }
}