import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environnements/environments';
import { ActivatedRoute } from '@angular/router';
import { CartepersonnaliseeService } from '../../../Services/cartepersonnalisee.service';
import { HeaderComponent } from '../../Commun/header/header.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { CommonModule, NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-telechargerinvitation',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,NgIf, NgClass, CommonModule
  ],
  templateUrl: './telechargerinvitation.component.html',
  styleUrls: ['./telechargerinvitation.component.scss']
})
export class TelechargerinvitationComponent {
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
    onImageLoad(): void {
      this.imageLoaded = true;
      console.log('Image chargée avec succès.');
    }
    
  
    async downloadPDF(): Promise<void> {
      alert('Bouton cliqué');  // Test simple

      console.log('Clic sur le bouton de téléchargement');
      
      if (!this.carte) {
        console.error('Pas de carte disponible');
        this.error = 'Aucune carte à télécharger';
        return;
      }
  
      console.log('Début de la génération du PDF');
      this.isGeneratingPDF = true;
      this.error = null;
  
      try {
        console.log('Création du PDF...');
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        
        // Utilisez html2canvas pour capturer le contenu
        const element = this.pdfContent.nativeElement;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        
        // Ajoutez l'image au PDF
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`carte_${this.carte.nom}.pdf`);
        
        console.log('PDF généré avec succès');
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
        this.error = 'Erreur lors de la génération du PDF';
      } finally {
        this.isGeneratingPDF = false;
      }
    }
  
    
  getPhotoUrl(photoPath: string): string {
    if (!photoPath) return '';
    return `${this.baseUrl}${photoPath}`;
  }
}
