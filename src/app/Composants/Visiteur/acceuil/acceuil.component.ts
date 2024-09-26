import { Component } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent {

}
