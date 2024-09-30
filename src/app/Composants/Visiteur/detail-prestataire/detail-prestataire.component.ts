import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../Commun/footer/footer.component";
import { HeaderComponent } from "../../Commun/header/header.component";
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../../Models/users.model';
import { CommentaireModel } from '../../../Models/commentaires.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environnements/environments';

@Component({
  selector: 'app-detail-prestataire',
  standalone: true,
  imports: [NgFor, FormsModule, FooterComponent, HeaderComponent, NgIf],
  templateUrl: './detail-prestataire.component.html',
  styleUrls: ['./detail-prestataire.component.scss']
})
export class DetailPrestataireComponent implements OnInit {
  users: UserModel[] = [];
  commentaires: CommentaireModel[] = [];
  prestataire: any;  
  prestataireId?: number; // Utilisation de '?' pour indiquer que ce champ peut être indéfini

  baseUrl: string = environment.apiurl;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers(); // Récupérer tous les utilisateurs
    this.prestataireId = +this.route.snapshot.params['id']; // Conversion en nombre
    if (this.prestataireId) {
      this.getPrestataireDetails(this.prestataireId);
      // this.getCommentairesForPrestataire(this.prestataireId);
    } else {
      console.error('ID de prestataire non défini');
    }
  }

  // Récupérer les détails d'un prestataire
  getPrestataireDetails(id: number): void {
    const apiUrl = `${this.baseUrl}users/${id}`;
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        this.prestataire = response;
        console.log(this.prestataire);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du prestataire', error);
      }
    );
  }

  // Récupérer les commentaires d'un prestataire
  // getCommentairesForPrestataire(id: number): void {
  //   const apiUrl = `${this.baseUrl}commentaires/prestataire/${id}`;
  //   this.http.get<CommentaireModel[]>(apiUrl).subscribe(
  //     (response) => {
  //       this.commentaires = response;
  //       console.log(this.commentaires);
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des commentaires', error);
  //     }
  //   );
  // }

  // Récupérer tous les utilisateurs
  getUsers(): void {
    const apiUrl = `${this.baseUrl}/users`;
    this.http.get<UserModel[]>(apiUrl).subscribe(
      (response) => {
        this.users = response;
        console.log(this.users);
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  // Obtenir l'URL de la photo
  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
}
