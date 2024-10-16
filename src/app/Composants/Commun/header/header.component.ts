import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,RouterLink,RouterLinkActive,RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLoggedIn: boolean = false;
  private subscription: Subscription = new Subscription();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Abonnement à l'état de connexion pour être informé des changements en temps réel
    this.subscription = this.authService.isLoggedIn().subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        this.checkTokenValidity();
      }
    );
  }
  checkTokenValidity(): void {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.authService.isTokenExpired(token)) {
        // Si le token est expiré, déconnexion automatique
        this.logout();
      } else {
        this.isLoggedIn = true;
      }
    } else {
      this.isLoggedIn = false;
    }
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
        Swal.fire('Déconnexion réussie', 'Vous avez été déconnecté avec succès.', 'success');
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
        this.router.navigate(['/login']);
        Swal.fire('Erreur', 'Erreur lors de la déconnexion. Veuillez réessayer.', 'error');
      }
    });
  }

  ngOnDestroy(): void {
    // Se désabonner de l'observable pour éviter les fuites de mémoire
    this.subscription.unsubscribe();
  }
}