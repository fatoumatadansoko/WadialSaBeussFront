import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarteinvitationService } from '../../../Services/carteinvitation.service';
import { HttpClient } from '@angular/common/http';
import { carteinvitationModel } from '../../../Models/carteinvitation.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carte-admin',
  standalone: true,
  imports: [
    NgFor,FormsModule,NgFor,NgIf,RouterModule
  ],
  templateUrl: './carte-admin.component.html',
  styleUrls: ['./carte-admin.component.scss']
})
export class CarteAdminComponent {
  isFormVisible: boolean = false; // Variable pour contrôler la visibilité du formulaire

  private CarteinvitationService = inject(CarteinvitationService);    
  router: any;
  constructor(private http: HttpClient,
    private categorieService: CarteinvitationService 
  ) { }
  
  // Déclaration des variables
  carteinvitations: carteinvitationModel[] = [];
  newCarte: carteinvitationModel = {
    id: 0,
    nom: '',
    contenu: '',
    categorie_id: '', // Initialisation
    image: '', // Initialisation
  };
  categories: any[] = []; // Déclarez cette propriété pour stocker les catégories

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
    // Ajoutez cette méthode dans votre composant CarteAdminComponent
    onImageChange(event: any): void {
      const file = event.target.files[0]; // Récupère le fichier image sélectionné
      if (file) {
        this.newCarte.image = file; // Assigner le fichier de type File
        console.log('Image sélectionnée :', this.newCarte.image);
      }
    }
    
    addCarte(): void {
      const formData = new FormData();
      formData.append('nom', this.newCarte.nom || ''); // Ajouter le nom
      formData.append('contenu', this.newCarte.contenu || ''); // Ajouter le contenu
      formData.append('categorie_id', this.newCarte.categorie_id || ''); // Convertir en chaîne
    
       // Si une nouvelle image est sélectionnée, ajoutez-la au FormData
    if (this.newCarte.image && typeof this.newCarte.image !== 'string') {
      formData.append('image', this.newCarte.image); // Ajouter l'image si elle est présente
    }
    
      const token = localStorage.getItem('token'); // Récupérer le token
      const headers = {
        'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête
      };
    
      this.CarteinvitationService.addCarte(formData).subscribe(
        (response: any) => {
          console.log('Carte créée avec succès', response);
          this.fetchCarteinvitations();
           // Rafraîchir la liste des cartes
    
          Swal.fire({
            icon: 'success',
            title: 'Carte créée avec succès!',
            showConfirmButton: false,
            timer: 3000
          }).then(() => {
            this.router.navigate(['/carte-personnalisee']);
          });
        },
        (error: any) => {
          console.error('Erreur lors de la création de la carte:', error);
        }
      );
    }
    

  }
  

