import { Component, inject } from '@angular/core';
import { UserService } from '../../../Services/users.service';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../../Models/users.model';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@/app/Services/auth.service';

@Component({
  selector: 'app-access-users',
  standalone: true,
  imports: [
    NgIf,NgFor,RouterModule
  ],
  templateUrl: './access-users.component.html',
  styleUrl: './access-users.component.scss'
})
export class AccessUsersComponent {

  private authService = inject(AuthService);
  private router =inject(Router);

  private UserService = inject(UserService);    
  constructor(private http: HttpClient) { }
  
  // Déclaration des variables
  users: UserModel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  ngOnInit() {
    this.fetchUsers();
}

   //récupération de tous les users
   fetchUsers(): void {
    this.UserService.getAllUser().subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.users = response.reverse();
          this.totalItems = this.users.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        } else {
          console.error('Erreur: la réponse ne contient pas de données utilisateur');
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }

  // Obtenir les utilisateurs de la page courante
  get paginatedUsers(): UserModel[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  // Navigation entre les pages
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Aller à une page spécifique
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Générer un tableau de numéros de page pour l'affichage
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
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

  }
  