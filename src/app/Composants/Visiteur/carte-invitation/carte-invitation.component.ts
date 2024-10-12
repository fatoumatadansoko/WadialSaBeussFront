import { Component, inject } from '@angular/core';
import { CarteinvitationService } from '../../../Services/carteinvitation.service';
import { HttpClient } from '@angular/common/http';
import { carteinvitationModel } from '../../../Models/carteinvitation.model';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../../Commun/header/header.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { environment } from '../../../../environnements/environments';
import { Router, RouterModule } from '@angular/router';
import html2canvas from 'html2canvas';
import { CategorieModel } from '../../../Models/categorie.model';
import { CategorieService } from '../../../Services/categorie.service';
import Swal from 'sweetalert2'; // Importation de SweetAlert2



@Component({
  selector: 'app-carte-invitation',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor, NgIf, ReactiveFormsModule, NgClass, RouterModule],
  templateUrl: './carte-invitation.component.html',
  styleUrls: ['./carte-invitation.component.scss'] // Correction de styleUrl -> styleUrls
})
export class CarteInvitationComponent {

  cartes: any[] = [];
  confirmationMessage: string = ''; // Variable pour le message de confirmation
  messageVisible: boolean = false; // Variable pour afficher ou cacher le message
 // Déclaration des services via le constructeur
 constructor(
  private fb: FormBuilder,
  private http: HttpClient,
  private CarteinvitationService: CarteinvitationService,
  private categorieService: CategorieService,
  private router: Router // Injection du routeur pour la redirection
) {
  this.emailForm = this.fb.group({
    emails_invites: ['', [Validators.required, Validators.email]]
  });
}

// Déclaration des variables
carte: carteinvitationModel = { nom: '', contenu: '' }; // Déclare la propriété 'carte'
showModal = false;
emailForm: FormGroup;
selectedCarte: carteinvitationModel = { nom: '', contenu: '' };
showEditModal: boolean = false;
photoUrl: string = '';
baseUrl: string = environment.apiurl;
categories: CategorieModel[] = [];
carteinvitations: carteinvitationModel[] = [];
selectedCategorie: any = null;
message: string = '';

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
  this.selectedCarte = { ...carte }; // Cloner la carte pour la modification
  this.showEditModal = true; // Afficher la modale de personnalisation
}

onImageSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedCarte.image = file; // Stocker l'image sélectionnée
  }
}

updateCarte(): void {
  if (this.selectedCarte) {
    const formData = new FormData();
    formData.append('nom', this.selectedCarte.nom || ''); // Ajouter le nom
    formData.append('contenu', this.selectedCarte.contenu || ''); // Ajouter le contenu

    // Si une nouvelle image est sélectionnée, ajoutez-la au FormData
    if (this.selectedCarte.image && typeof this.selectedCarte.image !== 'string') {
      formData.append('image', this.selectedCarte.image); // Ajouter l'image si elle est modifiée
    }

    const token = localStorage.getItem('auth_token'); // Récupérer le token
    const headers = {
      'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête
    };

    // Appeler le service pour mettre à jour la carte
    this.CarteinvitationService.updateCarte(this.selectedCarte.id!, formData).subscribe(
      (response: any) => {
        console.log('Carte mise à jour avec succès', response);
        this.fetchCarteinvitations(); // Rafraîchir la liste
        this.closeEditModal(); // Fermer la modale

        // Afficher SweetAlert2 pour le message de confirmation
        Swal.fire({
          icon: 'success',
          title: 'Carte mise à jour avec succès!',
          showConfirmButton: false,
          timer: 3000 // Durée d'affichage de 5 secondes
        }).then(() => {
          this.router.navigate(['/carte-personnalisee']); // Redirection vers le profil client
        });
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour de la carte:', error);
      }
    );
  }
}


closeEditModal(): void {
  this.selectedCarte = { nom: '', contenu: '', image: null }; // Réinitialiser
  this.showEditModal = false; // Masquer la modale
}


getPhotoUrl(photoPath: string): string {
  return `${this.baseUrl}${photoPath}`;
}

downloadCarteImage(carte: any): void {
  const cardElement = document.getElementById(`carte-${carte.id}`) as HTMLElement;
  if (cardElement) {
    html2canvas(cardElement, { scale: 2, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = imgData;
      a.download = `${carte.nom}.png`;
      a.click();
    }).catch(error => {
      console.error('Erreur lors de la capture de la carte :', error);
    });
  }
}

openEmailModal(carte: any): void {
  this.showModal = true;
}

closeModal(): void {
  this.showModal = false;
}

isString(value: any): boolean {
  return typeof value === 'string';
}
}