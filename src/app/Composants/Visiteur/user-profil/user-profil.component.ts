import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { UserService } from '../../../Services/users.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { UserModel } from '../../../Models/prestataire.model';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent
  ],
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit{
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder); // Utilisation du nom complet formBuilder

  public prestataireId?: number; // Ajoutez cette ligne pour déclarer la propriété

  userId: number | undefined; // ID du prestataire, à assigner lors de l'initialisation
  baseUrl: string = environment.apiurl;
  photoUrl: string = '';
  user: UserModel = {};
  userRole: string | undefined; // Stockage du rôle de l'utilisateur
// États d'édition
  editStates = {
  nom: false,
  email: false,
  telephone: false,
  adresse: false,
  description: false
};

userForm: FormGroup;

constructor() {
  this.userForm = this.formBuilder.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', Validators.required],
    adresse: ['', Validators.required],
    description: [''] // Ajout du champ description

  });
}
  ngOnInit(): void {
   this.getUserProfile();
   this.getUserRole(); // Récupérer le rôle de l'utilisateur

}
getUserProfile(): void {
  const prestataire = localStorage.getItem('prestataire');

  if (prestataire) {
      const prestataireId = JSON.parse(prestataire).id; // Récupère l'ID du client
    console.log(prestataireId);
  }
    this.userService.getProfile().subscribe(
      response => {
        console.log('Données de profil utilisateur:', response);
        this.user = response.data; // Stocke les données utilisateur renvoyées par l'API
      },
      error => {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    );
    
  }

  
  getUserRole(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser?.roles[0]?.name; // Récupération du rôle
    }
  }
  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
  toggleEdit(field: keyof typeof this.editStates): void {
    // Fermer les autres champs en édition
    Object.keys(this.editStates).forEach(key => {
      if (key !== field) {
        this.editStates[key as keyof typeof this.editStates] = false;
      }
    });
    
    this.editStates[field] = !this.editStates[field];
    
    if (this.editStates[field]) {
      // Mettre à jour le formulaire avec la valeur actuelle
      this.userForm.patchValue({
        [field]: this.user[field]
      });
    }
  }

  saveField(field: keyof typeof this.editStates): void {
    if (this.userForm.get(field)?.valid) {
      const newValue = this.userForm.get(field)?.value;
      
      // Appel au service avec uniquement le champ modifié
      this.userService.updateProfileField(field, newValue).subscribe({
        next: (response) => {
          if (response.status) {
            // Mise à jour réussie
            this.user[field] = newValue;
            this.editStates[field] = false;
            alert('Mise à jour réussie');
          } else {
            // La réponse indique une erreur
            alert(response.message || 'Erreur lors de la mise à jour');
          }
        },
        error: (error) => {
          console.error(`Erreur lors de la mise à jour de ${field}:`, error);
          
          // Message d'erreur plus détaillé
          let errorMessage = 'Erreur lors de la mise à jour';
          if (error.error?.message) {
            errorMessage = error.error.message;
          }
          if (error.error?.error) {
            errorMessage += '\n' + error.error.error;
          }
          
          // Restaurer l'ancienne valeur
          this.userForm.patchValue({
            [field]: this.user[field]
          });
          
          alert(errorMessage);
        }
      });
    } else {
      // Afficher un message si le champ n'est pas valide
      alert('Veuillez remplir correctement le champ');
    }
  }

  cancelEdit(field: keyof typeof this.editStates): void {
    this.editStates[field] = false;
    this.userForm.patchValue({
      [field]: this.user[field]
    });
  }
}