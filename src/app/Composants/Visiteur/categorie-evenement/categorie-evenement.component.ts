import { Component } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";

@Component({
  selector: 'app-categorie-evenement',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './categorie-evenement.component.html',
  styleUrl: './categorie-evenement.component.scss'
})
export class CategorieEvenementComponent {

}
