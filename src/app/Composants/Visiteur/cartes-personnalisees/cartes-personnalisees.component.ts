import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartepersonnaliseeService } from '../../../Services/cartepersonnalisee.service';
import { AuthService } from '../../../Services/auth.service';
import { environment } from '../../../../environnements/environments';
import { cartepersonnaliseeModel } from '../../../Models/cartepersonnalisee.model';
import { HeaderComponent } from '../../Commun/header/header.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cartes-personnalisees',
  standalone: true,
  imports: [ HeaderComponent, FooterComponent, NgFor, NgIf, ReactiveFormsModule, NgClass,RouterLink ],
  templateUrl: './cartes-personnalisees.component.html',
  styleUrls: ['./cartes-personnalisees.component.scss']
})
export class CartesPersonnaliseesComponent {
    @Input() carteId!: number;
    carte: any[] = [];
    showModal = false;
    selectedCarte: cartepersonnaliseeModel = { nom: '', contenu: '' };
    baseUrl: string = environment.apiurl;
    isSendingInvitations: boolean = false;
    emailForm: FormGroup;
  
    constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private cartepersonnaliseeService: CartepersonnaliseeService,
      private authService: AuthService
    ) {
      this.emailForm = this.formBuilder.group({
        invites: this.formBuilder.array([this.createInvite()]) // Initialisation avec un seul invité
      });
    }
  
    ngOnInit(): void {
      this.loadUserCartes();
    }
  
    // Fonction pour créer un invité
    createInvite(): FormGroup {
      return this.formBuilder.group({
        nom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
    }
  
    // Ajouter un nouvel invité au formulaire
    addInvite(): void {
      (this.emailForm.get('invites') as FormArray).push(this.createInvite());
    }
  
    // Ouvrir la modal pour envoyer l'invitation
    openEmailModal(carte: any): void {
      console.log('Carte sélectionnée:', carte); // Pour déboguer
      this.selectedCarte = carte;
      this.showModal = true;
    }
   
    // Fermer la modal
    closeModal(): void {
      this.showModal = false;
      this.emailForm.reset(); // Réinitialiser le formulaire
      this.emailForm.setControl('invites', this.formBuilder.array([this.createInvite()])); // Réinitialiser avec un seul invité
    }
    get invitesControls() {
      return (this.emailForm.get('invites') as FormArray).controls;
    }
     // Modifiez la méthode sendInvitation pour utiliser selectedCarte
     sendInvitation(): void {
      if (this.isSendingInvitations) {
        return;
      }
  
      if (!this.selectedCarte || !this.selectedCarte.id) {
        Swal.fire({
          title: 'Erreur!',
          text: 'Impossible de trouver la carte sélectionnée.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }
  
      const invitesFormArray = this.emailForm.get('invites') as FormArray;
      
      if (invitesFormArray.invalid) {
        Swal.fire({
          title: 'Erreur!',
          text: 'Veuillez vérifier les informations des invités.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }
  
      this.isSendingInvitations = true;
      const invites = invitesFormArray.value;
  
      this.cartepersonnaliseeService.envoyerCarte(this.selectedCarte.id, invites).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Succès!',
            text: response.message,
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
          });
          this.closeModal();
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi des invitations', error);
          let errorMessage = 'Une erreur est survenue lors de l\'envoi des invitations.';
          if (error.error?.message) {
            errorMessage = error.error.message;
          }
          Swal.fire({
            title: 'Erreur!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        },
        complete: () => {
          this.isSendingInvitations = false;
        }
      });
    }
    // Charger les cartes personnalisées de l'utilisateur
    loadUserCartes(): void {
      const client = localStorage.getItem('client');
  
      if (client) {
        const clientId = JSON.parse(client).id; // Récupère l'ID du client
        
        this.cartepersonnaliseeService.getCartesByClientId(clientId).subscribe(
          (response: any) => {
            if (response.status) {
              this.carte = response.data.sort((a: any, b: any) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
              });
            } else {
              console.error(response.message);
            }
          },
          (error) => {
            console.error('Erreur lors de la récupération des cartes', error);
          }
        );
      } else {
        console.error('Client non trouvé dans le localStorage');
      }
    }
  
    // Générer l'URL complète de la photo
    getPhotoUrl(photoPath: string): string {
      return `${this.baseUrl}${photoPath}`;
    }
  }