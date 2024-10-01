import { Component, inject } from '@angular/core';
import { Role, UserModel } from '../../../Models/users.model';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


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
          console.log(response);
          if (response.user && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
  
            // Vérification du stockage du token
            console.log('Token enregistré:', localStorage.getItem('token'));
  
            // Gestion des rôles et redirection
            if (response.user.roles) {
              if (response.user.roles.some((role: Role) => role.name === 'admin')) {
                this.router.navigateByUrl('dashboard-admin');
              } else if (response.user.roles.some((role: Role) => role.name === 'prestataire')) {
                this.router.navigateByUrl('dashboard-prestataire');
              } else if (response.user.roles.some((role: Role) => role.name === 'client')) {
                this.router.navigate(['acceuil']);
              } else {
                this.router.navigateByUrl('');
              }
            }
          }else
          {
            console.error(' token non enregistré');

          }
          
        },
        (error: any) => {
          console.error('Erreur lors de la connexion :', error);
          this.loginError = true;
        }
      );
    }
  }
}  