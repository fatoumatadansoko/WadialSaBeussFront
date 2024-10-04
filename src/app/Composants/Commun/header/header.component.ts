import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Redirection après déconnexion
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
        // Redirection même en cas d'erreur
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    // Se désabonner de l'observable pour éviter les fuites de mémoire
    this.subscription.unsubscribe();
  }
}