import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarteinvitationService } from '../../../Services/carteinvitation.service';
import { HttpClient } from '@angular/common/http';
import { carteinvitationModel } from '../../../Models/carteinvitation.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carte-admin',
  standalone: true,
  imports: [
    NgFor,FormsModule,NgFor
  ],
  templateUrl: './carte-admin.component.html',
  styleUrl: './carte-admin.component.scss'
})
export class CarteAdminComponent {

  private CarteService = inject(CarteinvitationService);    
  constructor(private http: HttpClient) { }
  
  // Déclaration des variables
  
  cartes: carteinvitationModel[] = [];
  //Déclaration des methodes
  ngOnInit(): void {
    this.fetchCartes();
}

   //récupération de tous les users
   fetchCartes(): void {
    this.CarteService.getAllCarteinvitations().subscribe(
      (response: any) => {
        console.log(response.data); // Cela devrait afficher le tableau des cartes
        console.log('Réponse complète:', response); // Vérifiez ici la structure
        if (response && response.data && Array.isArray(response.data)) {
          this.cartes = response.data(); // Assurez-vous d'utiliser la structure correcte
          console.log('Cartes:', this.cartes); // Vérifiez si les utilisateurs sont bien affectés
        } else {
          console.error('Erreur: la réponse ne contient pas de données cartes');
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des cartes:', error);
      }
    );
  }
  
  
  
  // Cette méthode retourne un Observable, pas une Subscription
  getCartes(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = { 'Authorization': `Bearer ${token}` };
  
    return this.http.get('http://127.0.0.1:8000/api/cartes', { headers });
  }
  }
  

