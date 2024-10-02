import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,RouterLink,RouterLinkActive,RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(public authService: AuthService, private router: Router) { 
    this.isLoggedIn = !!localStorage.getItem('token'); // Supposons que le token est stocké dans le localStorage

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Rediriger l'utilisateur après une déconnexion réussie ou forcée
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
        // Redirection après l'échec de la déconnexion si nécessaire
        this.router.navigate(['/login']);
      }
    });
  }
}
