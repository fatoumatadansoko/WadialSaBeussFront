import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../../Services/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { UserModel } from '../../../Models/prestataire.model';
import { SidebarComponent } from "../../Commun/sidebar/sidebar.component";
import { AuthService } from '@/app/Services/auth.service';

@Component({
  selector: 'app-dashbord-admin',
  standalone: true,
  imports: [
    CommonModule, NgIf,
    SidebarComponent,
    RouterModule,
],
  templateUrl: './dashbord-admin.component.html',
  styleUrl: './dashbord-admin.component.scss'
})
export class DashbordAdminComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router = inject(Router);


  userId: number | undefined; // ID du prestataire, à assigner lors de l'initialisation
  baseUrl: string = environment.apiurl;
  photoUrl: string = '';
  user: UserModel = {};

  ngOnInit(): void {
    this.getUserProfile();
 }
 getUserProfile(): void {
     this.userService.getProfile().subscribe(
       response => {
         console.log('Données de profil utilisateur:', response);
         this.user = response.data; // Stocke les données utilisateur renvoyées par l'API
       },
       error => {
         console.error('Erreur lors de la récupération des informations utilisateur:', error);
       }
     );
     
   }
   logout() {
    return this.authService.logout().subscribe(
        (response: any) => {
            console.log(response);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.router.navigateByUrl('/login'); 
        },
    );
}
   getPhotoUrl(photoPath: string): string {
     return `${this.baseUrl}${photoPath}`;
   }
}