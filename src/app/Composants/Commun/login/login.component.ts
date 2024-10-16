import { Component, inject } from '@angular/core';
import { Role, UserModel } from '../../../Models/users.model';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgFor,RouterModule,NgIf, FormsModule
     ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  // Correction ici
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router =inject(Router);


  // Declaration des variables
  userObject :UserModel = {};
  loginError: boolean = false;


  login() {
    console.log(this.userObject);
    if (this.userObject.email && this.userObject.password) {
      this.authService.login(this.userObject).subscribe(
        (response: any) => {
          console.log(response.user.roles[0].name);
          if (response.user && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            if (response.user.roles[0].name === 'prestataire') {
              localStorage.setItem('prestataire', JSON.stringify(response.prestataire));
            }
            if (response.user.roles[0].name === 'client') {
              localStorage.setItem('client', JSON.stringify(response.client));
            }
            // Vérification du stockage du token
            console.log('role:', response.user.roles);
  
            // Gestion des rôles et redirection
              // Redirection en fonction des rôles récupérés
              if (response.user.roles[0].name === 'admin') {
                this.router.navigateByUrl('dashbord-admin');
              } else if (response.user.roles[0].name === 'prestataire') {
                this.router.navigateByUrl('acceuil');
              } else if (response.user.roles[0].name === 'client') {
                this.router.navigate(['acceuil']);
              } else {
                this.router.navigateByUrl('');
              }
          } else {
            console.error('Token non enregistré');
          }
        },
        (error: any) => {
          console.error('Erreur lors de la connexion :', error);
          this.loginError = true;
        }
      );
    }
  }
  
    logout() {
    return this.authService.logout().subscribe(
        (response: any) => {
            console.log(response);
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            this.router.navigateByUrl('/login');
            
            // Afficher une alerte de succès avec SweetAlert
            Swal.fire({
                title: 'Déconnexion réussie',
                text: 'Vous avez été déconnecté avec succès.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        },
        (error) => {
            console.error(error);
            // Afficher une alerte d'erreur avec SweetAlert
            Swal.fire({
                title: 'Erreur',
                text: 'Erreur lors de la déconnexion. Veuillez réessayer.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    );
}

}  