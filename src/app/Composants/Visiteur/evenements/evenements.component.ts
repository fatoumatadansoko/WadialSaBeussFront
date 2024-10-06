import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../Commun/header/header.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { CategorieModel } from '../../../Models/categorie.model';
import { CategorieService } from '../../../Services/categorie.service';
import { Observable } from 'rxjs';
import { EventService } from '../../../Services/event.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [
    NgFor,FormsModule,HeaderComponent,FooterComponent
  ],
  templateUrl: './evenements.component.html',
  styleUrl: './evenements.component.scss'
})
export class EvenementsComponent{
  events: any[] = []; // Déclaration du tableau d'événements

  constructor(private eventService: EventService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserEvents();
  }

  loadUserEvents(): void {
    const userId = this.authService.getUserId(); // Méthode à créer pour récupérer l'ID de l'utilisateur connecté
    this.eventService.getUserEvents(userId).subscribe(
      (response) => {
        if (response.status) {
          this.events = response.data; // Assurez-vous que la structure de la réponse correspond à cela
        } else {
          console.error('Erreur lors de la récupération des événements:', response.message);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }
}