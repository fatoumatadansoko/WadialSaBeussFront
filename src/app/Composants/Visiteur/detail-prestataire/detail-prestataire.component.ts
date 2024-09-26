import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../Commun/footer/footer.component";
import { HeaderComponent } from "../../Commun/header/header.component";
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../../../Models/users.model';
import { UsersService } from '../../../Services/users.service'; // Assurez-vous d'importer UsersService

@Component({
  selector: 'app-detail-prestataire',
  standalone: true,
  imports: [NgFor, FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './detail-prestataire.component.html',
  styleUrl: './detail-prestataire.component.scss'
})
export class DetailPrestataireComponent {
  private usersService = inject(UsersService); // Utilisez 'usersService' avec un 'u' minuscule pour la variable d'instance

  tabMembres: UserModel[] = [];

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.usersService.getAllUser().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
