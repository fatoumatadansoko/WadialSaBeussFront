import { Component } from '@angular/core';
import { AcceuilComponent } from '../Composants/Visiteur/acceuil/acceuil.component';
import { LoginComponent } from '../Composants/Commun/login/login.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {

}
