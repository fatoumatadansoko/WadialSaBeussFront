import { Component, inject } from '@angular/core';
import { UserService } from '../../../Services/users.service';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../../Models/users.model';
import { Observable } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { SidebarComponent } from '../../Commun/sidebar/sidebar.component';

@Component({
  selector: 'app-access-users',
  standalone: true,
  imports: [
    NgIf,SidebarComponent,NgFor
  ],
  templateUrl: './access-users.component.html',
  styleUrl: './access-users.component.scss'
})
export class AccessUsersComponent {


  private UserService = inject(UserService);    
  constructor(private http: HttpClient) { }
  
  // Déclaration des variables
  
  users: UserModel[] = [];
  //Déclaration des methodes
  ngOnInit() {
    this.fetchUsers();
}

   //récupération de tous les users
   fetchUsers(): void {
    this.UserService.getAllUsers().subscribe(
      (response: any) => {
        console.log('Réponse complète:', response); // Vérifiez ici la structure
        if (response && Array.isArray(response)) {
          this.users = response.reverse(); // Assurez-vous d'utiliser la structure correcte
          console.log('Utilisateurs:', this.users); // Vérifiez si les utilisateurs sont bien affectés
        } else {
          console.error('Erreur: la réponse ne contient pas de données utilisateur');
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }
  
  
  
  // Cette méthode retourne un Observable, pas une Subscription
  getUsers(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = { 'Authorization': `Bearer ${token}` };
  
    return this.http.get('http://127.0.0.1:8000/api/users', { headers });
  }
  }
  