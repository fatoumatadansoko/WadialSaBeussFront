import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../Commun/footer/footer.component";
import { HeaderComponent } from "../../Commun/header/header.component";
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../../Models/users.model';
import { UserService } from '../../../Services/users.service'; // Assurez-vous d'importer UsersService
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environnements/environments';


@Component({
  selector: 'app-detail-prestataire',
  standalone: true,
  imports: [NgFor, FormsModule, FooterComponent, HeaderComponent,NgIf],
  templateUrl: './detail-prestataire.component.html',
  styleUrl: './detail-prestataire.component.scss'
})
export class DetailPrestataireComponent implements OnInit {
  users: UserModel[] = []; // Déclaration de la propriété users
  prestataire: any;  // Variable pour stocker les détails du prestataire
  prestataireId: number | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  baseUrl: string = environment.apiurl


  ngOnInit(): void {
    this.getUsers(); // Appel de la fonction pour récupérer les utilisateurs
    this.prestataireId = +this.route.snapshot.params['id'];  // Utiliser '+' pour convertir en nombre
    if (this.prestataireId) {
      this.getPrestataireDetails(this.prestataireId);
    } else {
      console.error('ID de prestataire non défini');
    }
  }
  
  getPrestataireDetails(id: number): void {
    const apiUrl = `http://127.0.0.1:8000/api/users/${id}`; // Assurez-vous d'utiliser le bon point de terminaison

    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        this.prestataire = response; // Stocke les détails du prestataire
        console.log(this.prestataire); // Affiche les détails dans la console
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du prestataire', error);
      }
    );
  }
  

  getUsers(): void {
    const apiUrl = 'http://127.0.0.1:8000/api/users'; // Remplacez par votre URL API

    this.http.get<UserModel[]>(apiUrl).subscribe(
      (response) => {
        this.users = response; // Assigner les utilisateurs récupérés
        console.log(this.users); // Afficher les données dans la console
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }
  
  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
}
