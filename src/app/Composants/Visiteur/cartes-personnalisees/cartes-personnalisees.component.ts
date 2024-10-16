import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../Commun/header/header.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarteinvitationService } from '../../../Services/carteinvitation.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import html2canvas from 'html2canvas';
import { cartepersonnaliseeModel } from '../../../Models/cartepersonnalisee.model';
import { carteinvitationModel } from '../../../Models/carteinvitation.model';
import { environment } from '../../../../environnements/environments';
import { CategorieModel } from '../../../Models/categorie.model';
import { CartepersonnaliseeService } from '../../../Services/cartepersonnalisee.service';
import { AuthService } from '../../../Services/auth.service';
import { apiurl } from '../../../Services/ApiUrl';
import  Swal from 'sweetalert2'
import { log } from 'console';
@Component({
  selector: 'app-cartes-personnalisees',
  standalone: true,
  imports: [ HeaderComponent, FooterComponent, FormsModule, NgFor, NgIf, ReactiveFormsModule, RouterLink, NgClass ],
  templateUrl: './cartes-personnalisees.component.html',
  styleUrls: ['./cartes-personnalisees.component.scss']
})
export class CartesPersonnaliseesComponent {
 
  @Input() carteId!: number; // Utilisez le point d'exclamation pour indiquer que ce champ sera défini

  carte: any[] = [];
  emailForm: FormGroup;
  showModal = false;
  selectedCarte: cartepersonnaliseeModel = { nom: '', contenu: '' };
  baseUrl: string = environment.apiurl;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cartepersonnaliseeService: CartepersonnaliseeService,
    private authService: AuthService
  )  {
    this.emailForm = this.formBuilder.group({
      emails_invites: ['', [Validators.required, this.emailValidator.bind(this)]],
    });
    ;
  }

  ngOnInit(): void {
    this.loadUserCartes();
  } 
  // Ajoutez cette fonction à votre composant
emailValidator(control: FormControl): { [key: string]: any } | null {
  const emails = control.value.split(',').map((email: string) => email.trim());
  const invalidEmails = emails.filter((email: string) => !this.isValidEmail(email));
  
  return invalidEmails.length ? { invalidEmails: invalidEmails } : null;
}

// Vérifie si un e-mail est valide
private isValidEmail(email: string): boolean {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

  
  // Charger les cartes personnalisées de l'utilisateur
  loadUserCartes(): void {
    const client = localStorage.getItem('client');

    if (client) {
        const clientId = JSON.parse(client).id; // Récupère l'ID du client
      console.log(clientId);
      
      this.cartepersonnaliseeService.getCartesByClientId(clientId).subscribe(
        (response: any) => {
            if (response.status) {
                this.carte = response.data.sort((a: any, b: any) => {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                });
                console.log('Cartes récupérées:', this.carte); // Ajoutez ceci
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


  // Ouvrir le modal d'envoi d'emails
    // Ouvrir la modal pour envoyer l'invitation
    openEmailModal(carte: any): void {
      this.selectedCarte = carte; // Stocker la carte sélectionnée
      this.showModal = true; // Afficher la modal
    }
  
    // Fermer la modal
    closeModal(): void {
      this.showModal = false; // Cacher la modal
      this.emailForm.reset(); // Réinitialiser le formulaire
    }
 
 sendInvitation(carte: any): void {
  if (this.emailForm.invalid) {
    console.log('Formulaire invalide:', this.emailForm.errors);
    return; // Ne pas envoyer si le formulaire est invalide
  }

  const emails = this.emailForm.value.emails_invites.split(',').map((email: string) => email.trim());

  console.log('E-mails à envoyer:', emails); // Vérifiez ici ce qui est envoyé

  this.cartepersonnaliseeService.envoyerCarte(carte.id, emails).subscribe({
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
      Swal.fire({
        title: 'Erreur!',
        text: 'Erreur lors de l\'envoi des invitations: ' + (error.error?.message || 'Erreur inconnue.'),
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  });

}


  // Générer l'URL complète de la photo
  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
}