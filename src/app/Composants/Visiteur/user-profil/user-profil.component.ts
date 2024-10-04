import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Commun/header/header.component";
import { FooterComponent } from "../../Commun/footer/footer.component";
import { UserService } from '../../../Services/users.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { UserModel } from '../../../Models/prestataire.model';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.scss'
})
export class UserProfilComponent implements OnInit{
  private userService = inject(UserService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  clientId: number = 1; // Remplacer par l'ID du client connecté (récupérer dynamiquement si nécessaire)
  userId: number | undefined; // ID du prestataire, à assigner lors de l'initialisation
  baseUrl: string = environment.apiurl;
  photoUrl: string = '';
  user: UserModel | undefined; // Objet pour le prestataire


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.userId = id;
      this.getUserDetails(id); // Récupérer les détails du prestataire
    } else {
      console.error('Invalid user ID');
    }
  }
   // Récupérer les détails du prestataire
   getUserDetails(id: number): void {
    this.userService.getUser(id).subscribe(
      (response: any) => {
        this.user = response.data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des détails du user:', error);
      }
    );
  }
}
