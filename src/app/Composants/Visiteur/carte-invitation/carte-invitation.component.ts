import { Component, inject } from '@angular/core';
import { CarteinvitationService } from '../../../Services/carteinvitation.service';
import { HttpClient } from '@angular/common/http';
import { carteinvitationModel } from '../../../Models/carteinvitation.model';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../../Commun/header/header.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-carte-invitation',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,NgFor],
  templateUrl: './carte-invitation.component.html',
  styleUrls: ['./carte-invitation.component.scss'] // Correction de styleUrl -> styleUrls
})
export class CarteInvitationComponent {


private CarteinvitationService = inject(CarteinvitationService);    
constructor(private http: HttpClient) { }

// Déclaration des variables

carteinvitations: carteinvitationModel[] = [];
//Déclaration des methodes
ngOnInit(): void {
  this.fetchCarteinvitations();
}
 //récupération de tous les categories des prestataires
 fetchCarteinvitations(): void {
  this.CarteinvitationService.getAllCarteinvitations().subscribe(
    (response: any) => {
      console.log('Réponse complète:', response); // Vérification de la structure de la réponse
      
      // Vérification si la structure contient les cartes dans "data"
      if (response && response.data && Array.isArray(response.data)) {
        this.carteinvitations = response.data; // Inversement des cartes si nécessaire
        console.log('Cartes:', this.carteinvitations);
      } else {
        console.error('Erreur: la réponse ne contient pas de données utilisateur');
      }
    },
    (error: any) => {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  );
}

 // Cette méthode retourne un Observable
 getCarteinvitations(): Observable<any> {
  const token = localStorage.getItem('auth_token');
  const headers = { 'Authorization': `Bearer ${token}` };

  return this.http.get('http://127.0.0.1:8000/api/cartes', { headers });
}
}
