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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Invite } from '../../../Models/invite.model';


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
  
    async generatePDF(invite: Invite): Promise<Blob> {
      if (!this.selectedCarte) {
        throw new Error('Aucune carte sélectionnée');
      }
  
      const cardElement = document.createElement('div');
      cardElement.innerHTML = `
        <div class="card" style="width: 100%; max-width: 600px; margin: 0 auto;">
          <div class="card-content" style="text-align: center; padding: 20px;">
            <h1>Invitation !</h1>
            ${this.selectedCarte.image ? 
              `<img src="${this.selectedCarte.image}" style="max-width: 100%; height: auto; margin: 20px 0;" />` 
              : ''}
            <p>${this.selectedCarte.contenu}</p>
            <p style="font-weight: bold;">${invite.nom}</p>
            <p>Nous serions ravis de vous compter parmi les invités.</p>
          </div>
        </div>
      `;
      document.body.appendChild(cardElement);
  
      try {
        // Attendre que l'image soit chargée
        if (this.selectedCarte.image) {
          await new Promise((resolve, reject) => {
            const img = cardElement.querySelector('img');
            if (img) {
              img.onload = () => resolve(true);
              img.onerror = () => reject(new Error('Erreur de chargement de l\'image'));
            } else {
              resolve(true);
            }
          });
        }
  
        const canvas = await html2canvas(cardElement, {
          useCORS: true,
          allowTaint: true,
          scale: 2
        });
        
        document.body.removeChild(cardElement);
  
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Convertir en Blob avec le bon type MIME
        return new Blob([pdf.output('blob')], { type: 'application/pdf' });
      } catch (error) {
        if (document.body.contains(cardElement)) {
          document.body.removeChild(cardElement);
        }
        throw error;
      }
    }
  
    async sendInvitation(): Promise<void> {
      if (this.isSendingInvitations || !this.selectedCarte) {
        return;
      }
  
      if (!this.selectedCarte.id) {
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
      const invites = invitesFormArray.value as Invite[];
  
      try {
        const formData = new FormData();
        
        // Ajouter l'ID de la carte
        formData.append('carteId', this.selectedCarte.id.toString());
        
        // Générer tous les PDFs d'abord
        for (let i = 0; i < invites.length; i++) {
          const invite = invites[i];
          try {
            const pdfBlob = await this.generatePDF(invite);
            
            // Créer un fichier à partir du blob
            const pdfFile = new File([pdfBlob], `invitation_${invite.nom}.pdf`, {
              type: 'application/pdf'
            });
  
            // Ajouter les données de l'invité au FormData
            formData.append(`invites[${i}][nom]`, invite.nom);
            formData.append(`invites[${i}][email]`, invite.email);
            formData.append(`invites[${i}][pdf]`, pdfFile);
          } catch (error) {
            console.error(`Erreur lors de la génération du PDF pour ${invite.nom}:`, error);
            throw error;
          }
        }
  
        // Envoyer le FormData
        this.cartepersonnaliseeService.envoyerCarte(this.selectedCarte.id, formData).subscribe({
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
      } catch (error) {
        this.isSendingInvitations = false;
        Swal.fire({
          title: 'Erreur!',
          text: 'Erreur lors de la génération des PDFs',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
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