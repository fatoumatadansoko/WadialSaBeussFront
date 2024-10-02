import { Component } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent {

}
