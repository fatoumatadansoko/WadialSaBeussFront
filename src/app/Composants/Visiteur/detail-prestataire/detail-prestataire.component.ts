import { Component } from '@angular/core';
import { FooterComponent } from "../../Commun/footer/footer.component";
import { HeaderComponent } from "../../Commun/header/header.component";

@Component({
  selector: 'app-detail-prestataire',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './detail-prestataire.component.html',
  styleUrl: './detail-prestataire.component.scss'
})
export class DetailPrestataireComponent {

}
