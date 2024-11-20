import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environnements/environments';
import { ActivatedRoute } from '@angular/router';
import { CartepersonnaliseeService } from '../../../Services/cartepersonnalisee.service';
import { HeaderComponent } from '../../Commun/header/header.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { CommonModule, NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-telechargerinvitation',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,NgIf, NgClass, CommonModule
  ],
  templateUrl: './telechargerinvitation.component.html',
  styleUrls: ['./telechargerinvitation.component.scss']
})
export class TelechargerinvitationComponent {
//   }
// }
alert(arg0: string) {
throw new Error('Method not implemented.');
}
  @ViewChild('cardImage') cardImage!: ElementRef<HTMLImageElement>;
  @ViewChild('pdfContent') pdfContent!: ElementRef;

  carte: any = null;
  baseUrl: string = environment.apiurl;
  error: string | null = null;
  isGeneratingPDF = false;
  imageLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private carteService: CartepersonnaliseeService
  ) {}

 
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const carteId = parseInt(params['id'], 10); // Récupération de l'ID
      const token = params['token']; // Récupération du token
      console.log('ID récupéré:', carteId);
      console.log('Token récupéré:', token);
  
      if (!isNaN(carteId) && carteId > 0 && token) {
        this.loadCarte(carteId, token);
      } else {
        this.error = 'ID ou token invalide dans l\'URL';
        console.error(this.error);
      }
    });
  }
  
    loadCarte(id: number, token: string): void {
      this.carteService.getCarteByIdAndToken(id, token).subscribe({
        next: (response: any) => {
          if (response?.status && response?.data) {
            this.carte = response.data;
            this.error = null;
            
            // Précharger l'image
            if (this.carte.image) {
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.src = this.getPhotoUrl(this.carte.image);
            }
          } else {
            this.error = 'Format de réponse invalide';
          }
        },
        error: (error) => {
          this.error = 'Erreur lors de la récupération de la carte';
          console.error('Erreur API:', error);
        }
      });
    }
    // downloadPDF(): void {
    //   console.log('Clic sur le bouton de téléchargement');
  
    //   if (!this.carte) {
    //     console.error('Pas de carte disponible');
    //     this.error = 'Aucune carte à télécharger';
    //     return;
    //   }
  
    //   console.log('Début de la génération du PDF');
    //   this.error = null;
  
    //   try {
    //     const pdf = new jsPDF();
  
    //     // Ajouter un titre au PDF
    //     pdf.setFont('helvetica', 'bold');
    //     pdf.setFontSize(18);
    //     pdf.text('Titre de la Carte', 20, 20);
  
    //     // Ajouter une image statique (remplacez par votre image en base64 ou chemin local)
    //     const imgData = 'data:image/png;base64,...'; // Remplacez par une vraie image base64
    //     pdf.addImage(imgData, 'PNG', 15, 30, 180, 100);
  
    //     // Ajouter un texte supplémentaire
    //     pdf.setFontSize(12);
    //     pdf.text(`Nom de la carte : ${this.carte.nom}`, 20, 150);
  
    //     // Télécharger le PDF
    //     pdf.save(`carte_${this.carte.nom}.pdf`);
    //     console.log('PDF généré avec succès');
    //   } catch (error) {
    //     console.error('Erreur lors de la génération du PDF:', error);
    //     this.error = 'Erreur lors de la génération du PDF';
    //   }
    // }
  
    downloadPDF(): void {
      console.log('Bouton cliqué');
      const pdf = new jsPDF();
      pdf.text('Ceci est un test PDF.', 10, 10);
      pdf.save('test.pdf');
    }
    
  getPhotoUrl(photoPath: string): string {
    if (!photoPath) return '';
    return `${this.baseUrl}${photoPath}`;
  }
}
