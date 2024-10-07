import { Component, inject } from '@angular/core';
import { CarteinvitationService } from '../../../Services/carteinvitation.service';
import { HttpClient } from '@angular/common/http';
import { carteinvitationModel } from '../../../Models/carteinvitation.model';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../../Commun/header/header.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { environment } from '../../../../environnements/environments';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { CategorieModel } from '../../../Models/categorie.model';
import { CategorieService } from '../../../Services/categorie.service';


@Component({
  selector: 'app-carte-invitation',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,NgFor,NgIf],
  templateUrl: './carte-invitation.component.html',
  styleUrls: ['./carte-invitation.component.scss'] // Correction de styleUrl -> styleUrls
})
export class CarteInvitationComponent {


private CarteinvitationService = inject(CarteinvitationService);    
private categorieService = inject(CategorieService);
constructor(private http: HttpClient,  
    private router: Router,
) {
  
 }

// Déclaration des variables
selectedCarte: carteinvitationModel = { nom: '', contenu: '' }; // Remplace CarteInvitation par le type approprié
showEditModal: boolean = false; // Contrôle de l'affichage de la modale
photoUrl: string = '';
baseUrl: string = environment.apiurl;
categories: CategorieModel[] = [];
carteinvitations: carteinvitationModel[] = [];
selectedCategorie: any = null;  
  message: string=''; 
//Déclaration des methodes
ngOnInit(): void {
  this.fetchCarteinvitations();
  this.fetchCategoriecartes();
}

fetchCategoriecartes(): void {
  const authToken = localStorage.getItem('token');
  this.categorieService.getAllCategories().subscribe(
    (response: any) => {
      console.log(response.data);
      this.categories = response.data; // Enregistrer les catégories reçues
    },
    (error: any) => {
      console.error('Erreur lors de la récupération des catégories', error);
    }
  );
}

onCategorieSelect(categorie: any): void {
  this.selectedCategorie = categorie;
  this.filterCartesByCategory(categorie.id); // Filtrage des prestataires par catégorie
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


//Filtrer les prestataires par catégorie
filterCartesByCategory(categoryId: number): void {
  this.carteinvitations =[];
  this.CarteinvitationService.getCartesByCategory(categoryId).subscribe(
    (response: any) => {
      this.carteinvitations = response.data; // Mettez à jour la liste des cartes

      if (this.carteinvitations.length === 0) {
        this.message = `Aucune carte trouvée pour cette catégorie.`;
      } else {
        this.message = '';
      }

      console.log('Cartes filtrées par catégorie:', this.carteinvitations);
    },
    (error: any) => {
      console.error('Erreur lors de la récupération des cartes par catégorie', error);

      if (error.status === 404) {
        this.message = `Erreur 404 : Aucune carte trouvée pour cette catégorie.`;
      } else {
        this.message = `Erreur lors de la récupération des cartes. Veuillez réessayer plus tard.`;
      }
    }
  );
}

 // Cette méthode retourne un Observable
 getCarteinvitations(): Observable<any> {
  const token = localStorage.getItem('auth_token');
  const headers = { 'Authorization': `Bearer ${token}` };

  return this.http.get('http://127.0.0.1:8000/api/cartes', { headers });
}
editCarte(carte: carteinvitationModel): void {
  this.selectedCarte = { ...carte }; // Cloner la carte pour éviter les modifications directes
  this.showEditModal = true; // Afficher la modale
}

updateCarte(): void {
  
  if (this.selectedCarte) {
    this.CarteinvitationService.updateCarte(this.selectedCarte.id!, this.selectedCarte).subscribe(
      (response: any) => {
        console.log('Carte mise à jour avec succès', response);
        this.fetchCarteinvitations(); // Rafraîchir la liste des cartes
        this.closeEditModal();
        this.router.navigate(['/profil-client']); // Redirection vers la liste des événements


      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour de la carte:', error);
      }
    );
  }
}

closeEditModal(): void {
  this.selectedCarte = { nom: '', contenu: '' }; // Reset selectedCarte to an empty object
  this.showEditModal = false; // Masquer la modale
}

getPhotoUrl(photoPath: string): string {
  return `${this.baseUrl}${photoPath}`;
}

downloadCarteImage(carte: any) {
  const cardElement = document.getElementById(`carte-${carte.id}`) as HTMLElement;
  
  if (cardElement) {
    html2canvas(cardElement, { scale: 2, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = imgData;
      a.download = `${carte.nom}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }).catch(error => {
      console.error('Erreur lors de la capture de la carte :', error);
    });
  }



}}