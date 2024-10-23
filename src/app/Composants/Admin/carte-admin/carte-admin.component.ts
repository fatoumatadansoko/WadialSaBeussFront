import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarteinvitationService } from '../../../Services/carteinvitation.service';
import { HttpClient } from '@angular/common/http';
import { carteinvitationModel } from '../../../Models/carteinvitation.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { CategorieService } from '../../../Services/categorie.service';

@Component({
  selector: 'app-carte-admin',
  standalone: true,
  imports: [
    NgFor,FormsModule,NgFor,NgIf,RouterModule,ReactiveFormsModule,
  ],
  templateUrl: './carte-admin.component.html',
  styleUrls: ['./carte-admin.component.scss']
})
export class CarteAdminComponent {
  isFormVisible: boolean = false; // Variable pour contrôler la visibilité du formulaire
  selectedCarte: any = null; // Initialize as null or empty object


  private CarteinvitationService = inject(CarteinvitationService);    

  // Ajout de FormBuilder dans le constructeur
  constructor(
    private http: HttpClient,
    private categorieService: CategorieService,
    private router: Router,
    private carteinvitationService: CarteinvitationService, 
    private fb: FormBuilder
  ) { 
    // Initialisation du formulaire avec des validations
    this.updateForm = this.fb.group({
      nom: ['', Validators.required],
      contenu: ['', Validators.required],
      image: [''] // L'image est optionnelle
    });
  }
  
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
  updateForm: FormGroup;
  selectedFile: File | null = null;

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.fetchCarteinvitations();
    this.fetchCategoriecartes();
  }

fetchCategoriecartes(): void {
  // const authToken = localStorage.getItem('token');
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
    // Méthode pour ouvrir le modal avec les données de la carte à modifier
  // Méthode pour ouvrir le modal avec les données de la carte à modifier
  openModal(carte: carteinvitationModel): void {
    this.updateForm.patchValue({
      nom: carte.nom,
      contenu: carte.contenu
    });
  }

  // Méthode pour gérer la sélection d'image
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

 // Méthode pour modifier une carte
 editCarte(carte: carteinvitationModel): void {
  this.newCarte = { ...carte }; // Charger la carte dans le formulaire pour modification
  this.isFormVisible = true; // Afficher le formulaire si nécessaire
}
onSubmit(carteId: number) {
  // Your logic for handling the form submission
  console.log('Submitted form for card with ID:', carteId);
  // Add your update logic here
}


  // Méthode pour supprimer une carte
  deleteCarte(carteId: number): void {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette carte?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CarteinvitationService.deleteCarte(carteId).subscribe(
          (response: any) => {
            Swal.fire('Supprimé!', 'La carte a été supprimée avec succès.', 'success');
            this.fetchCarteinvitations(); // Rafraîchir la liste après suppression
          },
          (error: any) => {
            console.error('Erreur lors de la suppression de la carte:', error);
          }
        );
      }
    });
  }


  }
  

